"""
RxSmart - Smart Prescription Interpreter
Flask Backend — PostgreSQL edition
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pytesseract
from PIL import Image
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import re
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Load .env file if present (local dev only)
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')
if not os.path.isdir(FRONTEND_DIR):
    FRONTEND_DIR = os.path.join(BASE_DIR, 'frontend')

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path='')
CORS(app, origins=[
    "https://rxsmart.onrender.com",   # production frontend static site
    "http://localhost:5000",          # local dev
    "http://localhost:3000",
    "http://127.0.0.1:5000",
])

# ===================== CONFIG =====================
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===================== DATABASE — PostgreSQL =====================
def get_db():
    """
    Return a new psycopg2 connection.
    Render injects DATABASE_URL automatically when you link a PostgreSQL service.
    Falls back to individual env vars for local dev.
    """
    url = os.environ.get("DATABASE_URL", "")

    # Render (and some other hosts) expose postgres:// but psycopg2 needs postgresql://
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    try:
        if url:
            conn = psycopg2.connect(url, cursor_factory=RealDictCursor)
        else:
            conn = psycopg2.connect(
                host=os.environ.get("DB_HOST", "localhost"),
                user=os.environ.get("DB_USER", "rxsmart"),
                password=os.environ.get("DB_PASSWORD", ""),
                dbname=os.environ.get("DB_NAME", "rxsmart"),
                port=int(os.environ.get("DB_PORT", 5432)),
                cursor_factory=RealDictCursor,
            )
        return conn
    except Exception as e:
        print(f"DB connection error: {e}")
        return None

# ===================== HELPERS =====================
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_image(path):
    """Run Tesseract OCR on uploaded image."""
    try:
        img = Image.open(path)
        config = '--oem 3 --psm 6 -l eng'
        text = pytesseract.image_to_string(img, config=config)
        return text.strip()
    except Exception as e:
        print(f"OCR error: {e}")
        return ""

def find_medicines_in_text(text):
    """Match OCR text against the PostgreSQL medicine table."""
    conn = get_db()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        # Extract candidate words (length > 4) from OCR text
        words = list({w for w in re.findall(r'[a-zA-Z]+', text.lower()) if len(w) > 4})
        if not words:
            conn.close()
            return []

        # Build parameterised query — PostgreSQL uses %s placeholders
        # ILIKE is PostgreSQL's case-insensitive LIKE
        conditions = ' OR '.join(
            ['LOWER(name) LIKE %s OR LOWER(generic_name) LIKE %s'] * len(words)
        )
        params = []
        for w in words:
            params.extend([f'%{w}%', f'%{w}%'])

        query = f"""
            SELECT id, name, generic_name, type,
                   purpose_en, dosage_en, precautions_en, side_effects_en,
                   purpose_ta, dosage_ta, precautions_ta, side_effects_ta, tags
            FROM medicines
            WHERE {conditions}
        """
        cursor.execute(query, params)
        candidates = cursor.fetchall()

        text_lower = text.lower()
        found = []
        seen_ids = set()

        for med in candidates:
            if med['id'] in seen_ids:
                continue
            name_parts = med['name'].lower().split()
            generic_parts = med['generic_name'].lower().split()

            name_match = all(p in text_lower for p in name_parts[:1])
            generic_match = any(p in text_lower for p in generic_parts if len(p) > 4)

            if name_match or generic_match:
                seen_ids.add(med['id'])
                tags = med['tags'].split(',') if med.get('tags') else []
                found.append({
                    'id': med['id'],
                    'name': med['name'],
                    'generic': med['generic_name'],
                    'type': med['type'],
                    'tags': [t.strip() for t in tags],
                    'en': {
                        'purpose': med['purpose_en'],
                        'dosage': med['dosage_en'],
                        'precautions': med['precautions_en'],
                        'sideEffects': med['side_effects_en'],
                    },
                    'ta': {
                        'purpose': med['purpose_ta'],
                        'dosage': med['dosage_ta'],
                        'precautions': med['precautions_ta'],
                        'sideEffects': med['side_effects_ta'],
                    },
                })

        cursor.close()
        conn.close()
        return found

    except Exception as e:
        print(f"Medicine match error: {e}")
        if conn:
            conn.close()
        return []

def save_prescription(session_id, original_text, medicines_found, file_path):
    """Store prescription + matched medicines in PostgreSQL."""
    conn = get_db()
    if not conn:
        return False
    try:
        cursor = conn.cursor()

        # PostgreSQL uses RETURNING to get the inserted id
        cursor.execute(
            """
            INSERT INTO prescriptions (session_id, original_text, file_path, medicines_count, created_at)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (session_id, original_text, file_path, len(medicines_found), datetime.now()),
        )
        prescription_id = cursor.fetchone()['id']

        for med in medicines_found:
            cursor.execute(
                """
                INSERT INTO prescription_medicines (prescription_id, medicine_id, medicine_name)
                VALUES (%s, %s, %s)
                """,
                (prescription_id, med.get('id'), med['name']),
            )

        conn.commit()
        cursor.close()
        conn.close()
        return prescription_id

    except Exception as e:
        print(f"Save error: {e}")
        if conn:
            conn.rollback()
            conn.close()
        return False

# ===================== ROUTES =====================

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'service': 'RxSmart API', 'version': '2.0', 'db': 'postgresql'})

# --- UPLOAD & OCR ---
@app.route('/api/upload', methods=['POST'])
def upload_prescription():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if not file.filename:
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Use JPG, PNG, or PDF.'}), 400

    ext = file.filename.rsplit('.', 1)[1].lower()
    filename = secure_filename(f"{uuid.uuid4()}.{ext}")
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    if ext == 'pdf':
        try:
            from pdf2image import convert_from_path
            pages = convert_from_path(filepath, first_page=1, last_page=1, dpi=200)
            img_path = filepath.replace('.pdf', '_p1.png')
            pages[0].save(img_path, 'PNG')
            ocr_text = extract_text_from_image(img_path)
        except ImportError:
            return jsonify({'error': 'PDF support requires pdf2image library.'}), 500
    else:
        ocr_text = extract_text_from_image(filepath)

    if not ocr_text:
        return jsonify({'error': 'Could not extract text. Please try a clearer photo.'}), 422

    medicines = find_medicines_in_text(ocr_text)
    session_id = str(uuid.uuid4())
    prescription_id = save_prescription(session_id, ocr_text, medicines, filename)

    response = {
        'success': True,
        'session_id': session_id,
        'raw_text': ocr_text,
        'medicines_found': len(medicines),
        'medicines': medicines,
    }
    if prescription_id is False:
        response['warning'] = 'Results could not be saved to history (database unavailable).'

    return jsonify(response)

# --- MEDICINE SEARCH ---
@app.route('/api/medicines/search')
def search_medicines():
    query = request.args.get('q', '').strip()
    if not query:
        return jsonify({'medicines': []})

    conn = get_db()
    if not conn:
        return jsonify({'error': 'Database unavailable'}), 503

    try:
        cursor = conn.cursor()
        like = f'%{query}%'
        cursor.execute(
            """
            SELECT id, name, generic_name, type,
                   purpose_en, dosage_en, precautions_en, side_effects_en,
                   purpose_ta, dosage_ta, precautions_ta, side_effects_ta, tags
            FROM medicines
            WHERE name ILIKE %s
               OR generic_name ILIKE %s
               OR type ILIKE %s
               OR purpose_en ILIKE %s
            ORDER BY name
            LIMIT 20
            """,
            (like, like, like, like),
        )
        results = cursor.fetchall()
        cursor.close()
        conn.close()

        medicines = [
            {
                'id': m['id'],
                'name': m['name'],
                'generic': m['generic_name'],
                'type': m['type'],
                'tags': [t.strip() for t in m['tags'].split(',')] if m.get('tags') else [],
                'en': {
                    'purpose': m['purpose_en'],
                    'dosage': m['dosage_en'],
                    'precautions': m['precautions_en'],
                    'sideEffects': m['side_effects_en'],
                },
                'ta': {
                    'purpose': m['purpose_ta'],
                    'dosage': m['dosage_ta'],
                    'precautions': m['precautions_ta'],
                    'sideEffects': m['side_effects_ta'],
                },
            }
            for m in results
        ]
        return jsonify({'medicines': medicines, 'count': len(medicines)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- GET SINGLE MEDICINE ---
@app.route('/api/medicines/<int:medicine_id>')
def get_medicine(medicine_id):
    conn = get_db()
    if not conn:
        return jsonify({'error': 'Database unavailable'}), 503
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM medicines WHERE id = %s", (medicine_id,))
        med = cursor.fetchone()
        cursor.close()
        conn.close()
        if not med:
            return jsonify({'error': 'Medicine not found'}), 404
        return jsonify(dict(med))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- ALL MEDICINES ---
@app.route('/api/medicines')
def get_all_medicines():
    conn = get_db()
    if not conn:
        return jsonify({'error': 'Database unavailable'}), 503
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, generic_name, type FROM medicines ORDER BY name")
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({'medicines': [dict(r) for r in results], 'total': len(results)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- PRESCRIPTION HISTORY ---
@app.route('/api/history')
def get_history():
    session_id = request.headers.get('X-Session-ID', '').strip()
    conn = get_db()
    if not conn:
        return jsonify({'history': []})
    try:
        cursor = conn.cursor()
        # PostgreSQL uses STRING_AGG instead of GROUP_CONCAT
        if session_id:
            cursor.execute(
                """
                SELECT p.id, p.session_id, p.created_at, p.medicines_count,
                       STRING_AGG(pm.medicine_name, ', ') AS medicine_names
                FROM prescriptions p
                LEFT JOIN prescription_medicines pm ON p.id = pm.prescription_id
                WHERE p.session_id = %s
                GROUP BY p.id, p.session_id, p.created_at, p.medicines_count
                ORDER BY p.created_at DESC
                LIMIT 20
                """,
                (session_id,),
            )
        else:
            cursor.execute(
                """
                SELECT p.id, p.session_id, p.created_at, p.medicines_count,
                       STRING_AGG(pm.medicine_name, ', ') AS medicine_names
                FROM prescriptions p
                LEFT JOIN prescription_medicines pm ON p.id = pm.prescription_id
                GROUP BY p.id, p.session_id, p.created_at, p.medicines_count
                ORDER BY p.created_at DESC
                LIMIT 20
                """
            )
        history = cursor.fetchall()
        cursor.close()
        conn.close()

        result = []
        for h in history:
            row = dict(h)
            if isinstance(row.get('created_at'), datetime):
                row['created_at'] = row['created_at'].isoformat()
            result.append(row)
        return jsonify({'history': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===================== ERROR HANDLERS =====================
@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File too large. Maximum size is 10 MB.'}), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

# ===================== MAIN =====================
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

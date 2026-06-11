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

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===================== DB =====================
def get_db():
    url = os.environ.get("DATABASE_URL", "")
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    if url:
        return psycopg2.connect(url, cursor_factory=RealDictCursor)

    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "rxsmart"),
        password=os.getenv("DB_PASSWORD", ""),
        dbname=os.getenv("DB_NAME", "rxsmart"),
        port=int(os.getenv("DB_PORT", 5432)),
        cursor_factory=RealDictCursor,
    )

# ===================== HELPERS =====================
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# ===================== OCR (TESSERACT - ORIGINAL) =====================
def extract_text_from_image(path):
    try:
        img = Image.open(path)
        config = "--oem 3 --psm 6 -l eng"
        text = pytesseract.image_to_string(img, config=config)
        return text.strip()
    except Exception as e:
        print("OCR error:", e)
        return ""

# ===================== MEDICINE MATCH =====================
def find_medicines_in_text(text):
    conn = get_db()
    cursor = conn.cursor()

    words = list(set(re.findall(r"[a-zA-Z]+", text.lower())))
    words = [w for w in words if len(w) > 4]

    if not words:
        return []

    conditions = " OR ".join(
        ["LOWER(name) LIKE %s OR LOWER(generic_name) LIKE %s"] * len(words)
    )

    params = []
    for w in words:
        params.extend([f"%{w}%", f"%{w}%"])

    query = f"""
        SELECT id, name, generic_name, type,
               purpose_en, dosage_en, precautions_en, side_effects_en, tags
        FROM medicines
        WHERE {conditions}
    """

    cursor.execute(query, params)
    rows = cursor.fetchall()

    found = []
    seen = set()

    for med in rows:
        if med["id"] in seen:
            continue

        text_lower = text.lower()

        if med["name"].lower() in text_lower or med["generic_name"].lower() in text_lower:
            seen.add(med["id"])

            found.append({
                "id": med["id"],
                "name": med["name"],
                "generic": med["generic_name"],
                "type": med["type"],
                "tags": med["tags"].split(",") if med.get("tags") else [],
                "en": {
                    "purpose": med["purpose_en"],
                    "dosage": med["dosage_en"],
                    "precautions": med["precautions_en"],
                    "sideEffects": med["side_effects_en"],
                }
            })

    cursor.close()
    conn.close()

    return found

# ===================== ROUTE =====================
@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400

    file = request.files["file"]

    if not file.filename:
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    file.save(path)

    text = extract_text_from_image(path)

    if not text:
        return jsonify({"error": "OCR failed"}), 422

    meds = find_medicines_in_text(text)

    return jsonify({
        "success": True,
        "raw_text": text,
        "medicines_found": len(meds),
        "medicines": meds
    })

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "service": "RxSmart"})

# ===================== RUN =====================
if __name__ == "__main__":
    app.run(debug=True)

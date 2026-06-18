"""
RxSmart - Backend with OCR + PostgreSQL Medicine Matching
"""
import os
import uuid
import requests
import psycopg2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

# ================= CONFIG =================
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# ================= DATABASE =================
def get_db():
    return psycopg2.connect(
        os.environ.get("DATABASE_URL"),
        sslmode="require"
    )


# ================= HELPERS =================
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def extract_text_from_image(path):
    print("OCR START")
    api_key = os.environ.get("OCR_SPACE_API_KEY")
    print("API KEY EXISTS:", bool(api_key))

    if not api_key:
        return ""

    with open(path, "rb") as f:
        response = requests.post(
            "https://api.ocr.space/parse/image",
            files={"file": f},
            data={
                "apikey": api_key,
                "language": "eng",
            },
        )

    result = response.json()
    print("OCR RESPONSE:", result)

    if result.get("IsErroredOnProcessing"):
        return ""

    if "ParsedResults" in result and result["ParsedResults"]:
        return result["ParsedResults"][0].get("ParsedText", "")

    return ""


def find_medicines(text):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, name, generic_name,
               purpose_en, dosage_en, side_effects_en
        FROM medicines
    """)

    medicines = cur.fetchall()

    print("OCR TEXT FOR MATCHING:", text)
    print("TOTAL MEDICINES IN DB:", len(medicines))

    matches = []

    for med in medicines:
        print("CHECKING:", med[1])  # medicine name

        if med[1].lower() in text.lower():
            print("MATCH FOUND:", med[1])

            matches.append({
                "id": med[0],
                "name": med[1],
                "generic_name": med[2],
                "purpose": med[3],
                "dosage": med[4],
                "side_effects": med[5]
            })

    cur.close()
    conn.close()

    return matches


# ================= ROUTES =================
@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = secure_filename(f"{uuid.uuid4()}.{ext}")
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # OCR
    ocr_text = extract_text_from_image(filepath)
    if not ocr_text:
        return jsonify({"error": "OCR failed"}), 422

    # Database medicine lookup
    matched_medicines = find_medicines(ocr_text)

    print("OCR TEXT:")
    print(ocr_text)
    print("MATCHED MEDICINES:")
    print(matched_medicines)

    response = {
        "success": True,
        "raw_text": ocr_text,
        "medicine_count": len(matched_medicines),
        "medicines": matched_medicines
    }
    return jsonify(response)


# ================= ERROR HANDLERS =================
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Server error"}), 500


# ================= RUN =================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


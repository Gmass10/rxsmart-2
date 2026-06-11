# RxSmart — Smart Prescription Interpreter
### Deployment Guide: Everything on Render (Frontend + Backend + PostgreSQL)

No Railway. No Netlify. One platform.

---

## 📁 Folder Structure

```
rxsmart/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── app.py
│   └── requirements.txt
├── database/
│   └── schema.sql
├── render.yaml       ← defines all 3 services
├── .gitignore
└── .env.example
```

---

## STEP 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial RxSmart commit (PostgreSQL)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rxsmart.git
git push -u origin main
```

---

## STEP 2 — Deploy on Render (Blueprint — one click)

1. Go to **[render.com](https://render.com)** → sign in with GitHub
2. Click **New** → **Blueprint**
3. Connect your `rxsmart` GitHub repo
4. Render reads `render.yaml` and creates **3 services** automatically:
   - `rxsmart-db` — free PostgreSQL database
   - `rxsmart-api` — Python/Flask backend (Singapore region)
   - `rxsmart` — static frontend site
5. Click **Apply** — wait ~4 minutes for all services to build

---

## STEP 3 — Load the Database Schema

After services are live:

1. In Render dashboard → click **rxsmart-db** → **Shell** tab
2. Paste the full contents of `database/schema.sql` and press Enter
3. All tables and sample medicine data will be created

Or from your local machine:
```bash
psql "$(render env get DATABASE_URL --service rxsmart-api)" -f database/schema.sql
```

---

## STEP 4 — Verify Everything

| Check | URL |
|---|---|
| Backend health | `https://rxsmart-api.onrender.com/api/health` |
| Medicine list | `https://rxsmart-api.onrender.com/api/medicines` |
| Frontend | `https://rxsmart.onrender.com` |

---

## ⚠️ Common Issues

| Problem | Fix |
|---|---|
| `psycopg2` ImportError | Ensure `psycopg2-binary` (not `psycopg2`) is in requirements.txt |
| `postgres://` connection error | `app.py` already handles the `postgres://` → `postgresql://` fix automatically |
| Render build fails on Tesseract | buildCommand must include `apt-get install -y tesseract-ocr poppler-utils` |
| Schema errors | Ensure schema.sql uses PostgreSQL syntax — no `ENGINE=InnoDB`, use `SERIAL` not `AUTO_INCREMENT` |
| Frontend can't reach API | Check `API_BASE` in app.js and ensure CORS origins include `https://rxsmart.onrender.com` |
| Free tier spin-down | First request after 15 min idle takes ~30 s — expected on free tier |

---

## 🔑 API Key for Browser OCR (standalone mode)

When running `index.html` directly (no backend), the Upload page prompts for an Anthropic API key.
Get one at **[console.anthropic.com/keys](https://console.anthropic.com/keys)**.
The key stays in `sessionStorage` only — never stored or logged.

---

## ⚠️ Medical Disclaimer

RxSmart is for informational purposes only. It does not provide medical advice, diagnosis, or treatment.
Always consult a qualified healthcare professional before taking any medication.

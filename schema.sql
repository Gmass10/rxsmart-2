-- =====================================================================
-- RxSmart PostgreSQL Database Schema
-- Run via Render dashboard: rxsmart-db → Shell, paste and execute
-- Or locally: psql $DATABASE_URL -f schema.sql
-- =====================================================================

-- ===================== MEDICINES TABLE =====================
CREATE TABLE IF NOT EXISTS medicines (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    generic_name    VARCHAR(200) NOT NULL,
    type            VARCHAR(100),
    tags            VARCHAR(300),

    -- English content
    purpose_en      TEXT NOT NULL,
    dosage_en       TEXT NOT NULL,
    precautions_en  TEXT,
    side_effects_en TEXT,

    -- Tamil content
    purpose_ta      TEXT,
    dosage_ta       TEXT,
    precautions_ta  TEXT,
    side_effects_ta TEXT,

    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Full-text search index (PostgreSQL tsvector)
CREATE INDEX IF NOT EXISTS idx_medicines_fts
    ON medicines USING gin(to_tsvector('english', name || ' ' || generic_name || ' ' || COALESCE(purpose_en, '')));

CREATE INDEX IF NOT EXISTS idx_medicines_name    ON medicines (name);
CREATE INDEX IF NOT EXISTS idx_medicines_generic ON medicines (generic_name);

-- ===================== PRESCRIPTIONS TABLE =====================
CREATE TABLE IF NOT EXISTS prescriptions (
    id              SERIAL PRIMARY KEY,
    session_id      VARCHAR(64)  NOT NULL UNIQUE,
    original_text   TEXT,
    file_path       VARCHAR(300),
    medicines_count INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prescriptions_session ON prescriptions (session_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_created ON prescriptions (created_at);

-- ===================== PRESCRIPTION_MEDICINES TABLE =====================
CREATE TABLE IF NOT EXISTS prescription_medicines (
    id                SERIAL PRIMARY KEY,
    prescription_id   INT NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
    medicine_id       INT REFERENCES medicines(id) ON DELETE SET NULL,
    medicine_name     VARCHAR(200)
);

CREATE INDEX IF NOT EXISTS idx_pm_prescription ON prescription_medicines (prescription_id);

-- ===================== REMINDERS TABLE =====================
CREATE TABLE IF NOT EXISTS reminders (
    id              SERIAL PRIMARY KEY,
    session_id      VARCHAR(64) NOT NULL,
    medicine_id     INT REFERENCES medicines(id) ON DELETE SET NULL,
    medicine_name   VARCHAR(200),
    reminder_time   TIME NOT NULL,
    frequency       VARCHAR(50),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reminders_session ON reminders (session_id);

-- ===================== AUTO-UPDATE updated_at =====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_medicines_updated_at ON medicines;
CREATE TRIGGER set_medicines_updated_at
    BEFORE UPDATE ON medicines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================== SAMPLE MEDICINE DATA =====================
INSERT INTO medicines
    (name, generic_name, type, tags,
     purpose_en, dosage_en, precautions_en, side_effects_en,
     purpose_ta, dosage_ta, precautions_ta, side_effects_ta)
VALUES
(
    'Paracetamol 500mg', 'Acetaminophen', 'Analgesic / Antipyretic', 'OTC,Safe for adults',
    'Relief of mild to moderate pain and reduction of fever.',
    '1 tablet (500mg) after food, every 4-6 hours as needed. Maximum 8 tablets per day.',
    'Do not exceed 8 tablets in 24 hours. Avoid alcohol. Do not use with other paracetamol products.',
    'Rarely causes side effects at recommended doses. Overdose may cause liver damage.',
    'இலேசான முதல் மிதமான வலி நிவாரணம் மற்றும் காய்ச்சல் குறைப்பு.',
    '1 மாத்திரை (500mg) சாப்பிட்ட பிறகு, 4-6 மணி நேரத்திற்கு ஒரு முறை.',
    '24 மணி நேரத்தில் 8 மாத்திரைகளுக்கு மேல் உட்கொள்ள வேண்டாம்.',
    'பரிந்துரைக்கப்பட்ட அளவில் பக்கவிளைவுகள் அரிது.'
),
(
    'Ibuprofen 400mg', 'Ibuprofen', 'NSAID / Anti-inflammatory', 'OTC,After food',
    'Relieves pain, inflammation, and fever. Used for headaches, body aches, dental pain, and arthritis.',
    '1 tablet (400mg) after food, every 6-8 hours. Maximum 3 tablets per day.',
    'Always take with food to protect the stomach. Avoid if you have kidney disease, stomach ulcers, or heart problems.',
    'Stomach upset, nausea, heartburn. Rarely: stomach bleeding, kidney issues.',
    'வலி, அழற்சி மற்றும் காய்ச்சல் குறைக்கிறது.',
    '1 மாத்திரை (400mg) சாப்பிட்ட பிறகு, 6-8 மணி நேரத்திற்கு ஒரு முறை.',
    'வயிற்றை பாதுகாக்க எப்போதும் உணவுடன் உட்கொள்ளவும்.',
    'வயிற்று உபாதை, குமட்டல், நெஞ்செரிச்சல்.'
),
(
    'Amoxicillin 500mg', 'Amoxicillin', 'Antibiotic', 'Prescription,Complete full course',
    'Treatment of bacterial infections including throat, ear, urinary tract, and chest infections.',
    '1 capsule (500mg) 3 times daily (every 8 hours). Complete the full prescribed course.',
    'Inform doctor if allergic to penicillin. Complete the full course even if you feel better.',
    'Diarrhoea, stomach upset, skin rash. Seek help if rash or breathing difficulty occurs.',
    'பாக்டீரியா தொற்றுகளுக்கான சிகிச்சை.',
    '1 கேப்சூல் (500mg) தினமும் 3 முறை. முழு சிகிச்சை படிப்பை முடிக்கவும்.',
    'பெனிசிலினுக்கு ஒவ்வாமை இருந்தால் மருத்துவரிடம் தெரிவிக்கவும்.',
    'வயிற்றுப்போக்கு, தோல் தடிப்பு ஏற்படலாம்.'
),
(
    'Azithromycin 500mg', 'Azithromycin', 'Antibiotic (Macrolide)', 'Prescription,3-day course',
    'Treats bacterial infections including respiratory tract infections, ear infections, and some skin infections.',
    '1 tablet (500mg) once daily for 3 days (or as directed). Can be taken with or without food.',
    'Complete the full course. Inform doctor of any heart conditions. May interact with antacids.',
    'Nausea, vomiting, diarrhoea, stomach cramps. Rarely causes abnormal heart rhythm.',
    'சுவாச பாதை நோய்த்தொற்றுகள், காது நோய்த்தொற்றுகளுக்கு சிகிச்சையளிக்கிறது.',
    '1 மாத்திரை (500mg) தினமும் ஒரு முறை 3 நாட்களுக்கு.',
    'முழு படிப்பை முடிக்கவும். இதய நோய்கள் இருந்தால் மருத்துவரிடம் தெரிவிக்கவும்.',
    'குமட்டல், வாந்தி, வயிற்றுப்போக்கு.'
),
(
    'Metformin 500mg', 'Metformin HCl', 'Antidiabetic', 'Prescription,Diabetes',
    'Helps control blood sugar levels in patients with type 2 diabetes.',
    '1 tablet (500mg) with meals, 2 times daily. Swallow whole with water.',
    'Take with food to reduce stomach upset. Regular blood sugar monitoring required.',
    'Nausea, vomiting, diarrhoea (usually improves after a few weeks).',
    'வகை 2 நீரிழிவு நோயாளிகளில் இரத்த சர்க்கரை அளவை கட்டுப்படுத்த உதவுகிறது.',
    '1 மாத்திரை (500mg) சாப்பிட்ட பிறகு, தினமும் 2 முறை.',
    'வயிற்று உபாதையை குறைக்க உணவுடன் உட்கொள்ளவும்.',
    'குமட்டல், வாந்தி, வயிற்றுப்போக்கு (சில வாரங்களில் குணமாகும்).'
),
(
    'Glimepiride 1mg', 'Glimepiride', 'Antidiabetic (Sulfonylurea)', 'Prescription,Diabetes,Before food',
    'Stimulates the pancreas to produce more insulin. Used in type 2 diabetes management.',
    '1 tablet (1mg) before breakfast, once daily or as prescribed.',
    'Do not skip meals after taking this medicine. Monitor blood sugar regularly.',
    'Low blood sugar (hypoglycaemia), dizziness, sweating, weight gain, nausea.',
    'கணையத்தை இன்சுலின் உற்பத்தி செய்ய தூண்டுகிறது.',
    '1 மாத்திரை (1mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.',
    'இந்த மருந்தை உட்கொண்ட பிறகு உணவை தவிர்க்க வேண்டாம்.',
    'இரத்த சர்க்கரை குறைவு, தலைசுற்றல், வியர்வை.'
),
(
    'Omeprazole 20mg', 'Omeprazole', 'Proton Pump Inhibitor', 'Acidity,Before food',
    'Reduces stomach acid. Used for heartburn, acid reflux, stomach ulcers, and gastritis.',
    '1 capsule (20mg) before breakfast, once daily. Swallow whole; do not crush or chew.',
    'Do not take for more than 14 days without consulting a doctor.',
    'Headache, stomach pain, nausea, diarrhoea, constipation.',
    'வயிற்று அமிலத்தை குறைக்கிறது. நெஞ்செரிச்சல், அமிலப் பின்னிழுப்பு, வயிற்று புண்களுக்கு பயன்படுகிறது.',
    '1 கேப்சூல் (20mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.',
    'மருத்துவரை ஆலோசிக்காமல் 14 நாட்களுக்கு மேல் உட்கொள்ள வேண்டாம்.',
    'தலைவலி, வயிற்று வலி, குமட்டல், வயிற்றுப்போக்கு.'
),
(
    'Pantoprazole 40mg', 'Pantoprazole Sodium', 'Proton Pump Inhibitor', 'Acidity,Before food',
    'Reduces stomach acid for heartburn, acid reflux, GERD, and stomach/duodenal ulcers.',
    '1 tablet (40mg) before breakfast, once daily. Swallow whole with water.',
    'Inform doctor about long-term use. May reduce magnesium/B12 levels over time.',
    'Headache, diarrhoea, nausea, stomach pain, flatulence.',
    'நெஞ்செரிச்சல், GERD, வயிற்று புண்களுக்கு வயிற்று அமிலத்தை குறைக்கிறது.',
    '1 மாத்திரை (40mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.',
    'நீண்ட கால பயன்பாட்டை மருத்துவரிடம் தெரிவிக்கவும்.',
    'தலைவலி, வயிற்றுப்போக்கு, குமட்டல்.'
),
(
    'Atorvastatin 10mg', 'Atorvastatin', 'Statin / Cholesterol', 'Prescription,Evening dose',
    'Lowers bad cholesterol (LDL) and reduces risk of heart disease and stroke.',
    '1 tablet (10mg) at bedtime, once daily.',
    'Avoid grapefruit juice. Regular liver tests needed. Report muscle pain immediately.',
    'Muscle pain, headache, nausea, joint pain.',
    'கெட்ட கொலஸ்ட்ரால் (LDL) ஐ குறைக்கிறது மற்றும் இதய நோயை தடுக்கிறது.',
    '1 மாத்திரை (10mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.',
    'கல்லீரல் செயல்பாட்டு சோதனைகள் தேவை.',
    'தசை வலி, தலைவலி, குமட்டல்.'
),
(
    'Rosuvastatin 10mg', 'Rosuvastatin Calcium', 'Statin / Cholesterol', 'Prescription,Any time',
    'Reduces LDL (bad) cholesterol and triglycerides; increases HDL (good) cholesterol.',
    '1 tablet (10mg) once daily at any time, with or without food.',
    'Report unexplained muscle pain immediately. Avoid in liver disease or pregnancy.',
    'Muscle pain, headache, constipation, nausea, dizziness.',
    'கெட்ட கொலஸ்ட்ரால் (LDL) மற்றும் ட்ரைகிளிசரைடுகளை குறைக்கிறது.',
    '1 மாத்திரை (10mg) தினமும் ஒரு முறை, எந்த நேரத்திலும்.',
    'கல்லீரல் நோய் அல்லது கர்ப்ப காலத்தில் தவிர்க்கவும்.',
    'தசை வலி, தலைவலி, மலச்சிக்கல்.'
),
(
    'Amlodipine 5mg', 'Amlodipine Besylate', 'Calcium Channel Blocker', 'Blood Pressure,Prescription',
    'Treats high blood pressure and chest pain (angina).',
    '1 tablet (5mg) once daily at the same time each day.',
    'Do not stop without doctor advice. Monitor blood pressure regularly.',
    'Swelling in feet/ankles, flushing, headache, dizziness.',
    'உயர் இரத்த அழுத்தம் மற்றும் மார்பு வலிக்கு சிகிச்சையளிக்கிறது.',
    '1 மாத்திரை (5mg) தினமும் ஒரு முறை, ஒரே நேரத்தில்.',
    'மருத்துவரின் ஆலோசனையின்றி நிறுத்த வேண்டாம்.',
    'கால் வீக்கம், தலைவலி, மயக்கம்.'
),
(
    'Losartan 50mg', 'Losartan Potassium', 'ARB / Antihypertensive', 'Blood Pressure,Prescription',
    'Controls high blood pressure and protects the kidneys in diabetic patients.',
    '1 tablet (50mg) once daily, with or without food.',
    'Do not use in pregnancy. Monitor kidney function and potassium levels.',
    'Dizziness, fatigue, high potassium, nasal congestion, back pain.',
    'உயர் இரத்த அழுத்தத்தை கட்டுப்படுத்துகிறது மற்றும் நீரிழிவு நோயாளிகளில் சிறுநீரகங்களை பாதுகாக்கிறது.',
    '1 மாத்திரை (50mg) தினமும் ஒரு முறை.',
    'கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம்.',
    'தலைசுற்றல், சோர்வு, அதிக பொட்டாசியம்.'
),
(
    'Telmisartan 40mg', 'Telmisartan', 'ARB / Antihypertensive', 'Blood Pressure,Prescription',
    'Manages high blood pressure and reduces the risk of cardiovascular events.',
    '1 tablet (40mg) once daily at the same time each day, with or without food.',
    'Not for use in pregnancy. Monitor kidney function.',
    'Dizziness, back pain, sinus infection, diarrhoea.',
    'உயர் இரத்த அழுத்தத்தை நிர்வகிக்கிறது மற்றும் இதய நோய் அபாயத்தை குறைக்கிறது.',
    '1 மாத்திரை (40mg) தினமும் ஒரு முறை.',
    'கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம்.',
    'தலைசுற்றல், முதுகு வலி, வயிற்றுப்போக்கு.'
),
(
    'Atenolol 50mg', 'Atenolol', 'Beta Blocker', 'Blood Pressure,Heart,Prescription',
    'Treats high blood pressure, angina, and abnormal heart rhythms.',
    '1 tablet (50mg) once daily, with or without food.',
    'Do not stop suddenly — taper as directed. Not for asthmatics. Monitor pulse rate.',
    'Tiredness, cold hands/feet, slow heartbeat, dizziness, sleep disturbance.',
    'உயர் இரத்த அழுத்தம், மார்பு வலி மற்றும் இதய துடிப்பு அசாதாரணங்களுக்கு சிகிச்சை.',
    '1 மாத்திரை (50mg) தினமும் ஒரு முறை.',
    'திடீரென நிறுத்த வேண்டாம். ஆஸ்துமா நோயாளிகளுக்கு ஏற்றதல்ல.',
    'சோர்வு, கை/கால் குளிர்ச்சி, மெதுவான இதயத் துடிப்பு.'
),
(
    'Ramipril 5mg', 'Ramipril', 'ACE Inhibitor', 'Blood Pressure,Heart,Prescription',
    'Lowers blood pressure, treats heart failure, and protects kidneys in diabetes.',
    '1 tablet (5mg) once daily, with or without food.',
    'Do not use in pregnancy. Watch for persistent dry cough. Monitor kidney function.',
    'Dry cough, dizziness, elevated potassium, headache.',
    'இரத்த அழுத்தத்தை குறைக்கிறது, இதய செயலிழப்பு சிகிச்சை.',
    '1 மாத்திரை (5mg) தினமும் ஒரு முறை.',
    'கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம்.',
    'வறண்ட இருமல், தலைசுற்றல், அதிக பொட்டாசியம்.'
),
(
    'Cetirizine 10mg', 'Cetirizine HCl', 'Antihistamine', 'Allergy,OTC',
    'Relieves allergy symptoms such as runny nose, sneezing, itchy eyes, and skin rashes.',
    '1 tablet (10mg) at bedtime, once daily.',
    'May cause drowsiness — avoid driving or operating machinery. Avoid alcohol.',
    'Drowsiness, dry mouth, headache, dizziness.',
    'மூக்கு ஒழுகுதல், தும்மல், கண் எரிச்சல் மற்றும் தோல் தடிப்பு போன்ற ஒவ்வாமை அறிகுறிகளை நிவாரணப்படுத்துகிறது.',
    '1 மாத்திரை (10mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.',
    'தூக்கம் வரலாம் — வாகனம் ஓட்டுவதை தவிர்க்கவும்.',
    'தூக்கம், வாய் வறட்சி, தலைவலி.'
),
(
    'Salbutamol 4mg', 'Salbutamol Sulphate', 'Bronchodilator', 'Asthma,COPD,Prescription',
    'Relieves and prevents bronchospasm in asthma and COPD. Opens the airways for easier breathing.',
    '1 tablet (4mg) 3-4 times daily or as prescribed. Inhaler: 1-2 puffs as needed.',
    'Not a substitute for long-term asthma control. Inform doctor of heart conditions.',
    'Tremor, palpitations, headache, increased heart rate, muscle cramps.',
    'ஆஸ்துமா மற்றும் COPD இல் சுவாச குழாய் சுருக்கத்தை நிவாரணப்படுத்துகிறது.',
    '1 மாத்திரை (4mg) தினமும் 3-4 முறை.',
    'நீண்ட கால ஆஸ்துமா கட்டுப்பாட்டிற்கு மட்டுமே நம்பாதீர்கள்.',
    'நடுக்கம், படபடப்பு, தலைவலி.'
),
(
    'Levothyroxine 50mcg', 'Levothyroxine Sodium', 'Thyroid Hormone', 'Thyroid,Before food,Prescription',
    'Treats hypothyroidism (underactive thyroid). Replaces natural thyroid hormones.',
    '1 tablet (50mcg) on an empty stomach, 30-60 minutes before breakfast, once daily.',
    'Take on an empty stomach. Avoid calcium, antacids, or iron within 4 hours.',
    'If dose is too high: palpitations, sweating, weight loss, tremors, insomnia.',
    'ஹைப்போதைராய்டிசம் சிகிச்சை. இயற்கை தைராய்டு ஹார்மோன்களை மாற்றுகிறது.',
    '1 மாத்திரை (50mcg) காலை உணவுக்கு 30-60 நிமிடம் முன், வெறும் வயிற்றில்.',
    'வெறும் வயிற்றில் உட்கொள்ளவும். 4 மணி நேரத்தில் கால்சியம் எடுக்க வேண்டாம்.',
    'அளவு அதிகமானால்: படபடப்பு, வியர்வை, எடை இழப்பு.'
),
(
    'Vitamin D3 60000 IU', 'Cholecalciferol', 'Vitamin Supplement', 'Supplement,Weekly',
    'Treats and prevents Vitamin D deficiency. Supports bone health, immunity, and muscle function.',
    '1 sachet/capsule (60,000 IU) once a week for 8-12 weeks, or as prescribed.',
    'Do not take daily high doses without monitoring. Excess can cause toxicity.',
    'Usually safe. Overdose may cause nausea, weakness, excessive urination.',
    'வைட்டமின் D குறைபாட்டை சிகிச்சையளிக்கிறது. எலும்பு ஆரோக்கியம் மற்றும் நோய் எதிர்ப்பு சக்தியை ஆதரிக்கிறது.',
    '1 சாஷே/கேப்சூல் (60,000 IU) வாரம் ஒரு முறை.',
    'கண்காணிப்பு இல்லாமல் அதிக அளவு தினமும் எடுக்க வேண்டாம்.',
    'பொதுவாக பாதுகாப்பானது. அதிக அளவு குமட்டல் ஏற்படலாம்.'
),
(
    'Calcium + Vitamin D3', 'Calcium Carbonate + Cholecalciferol', 'Mineral Supplement', 'Supplement,After food',
    'Prevents and treats calcium deficiency. Supports bone strength and prevents osteoporosis.',
    '1 tablet after food, twice daily, or as prescribed.',
    'Take after food for better absorption. Avoid in hypercalcaemia.',
    'Constipation, gas, bloating. Rarely: kidney stones with excessive use.',
    'கால்சியம் குறைபாட்டை தடுக்கிறது மற்றும் சிகிச்சையளிக்கிறது.',
    '1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் இரு முறை.',
    'சிறந்த உறிஞ்சுதலுக்கு உணவுக்கு பிறகு உட்கொள்ளவும்.',
    'மலச்சிக்கல், வாயு, வயிறு உப்பசம்.'
),
(
    'Methylcobalamin 500mcg', 'Methylcobalamin (Vitamin B12)', 'Vitamin Supplement', 'Supplement,Nerve health',
    'Treats Vitamin B12 deficiency. Supports nerve function and red blood cell formation.',
    '1 tablet once daily after food, or as prescribed.',
    'Safe for most people. Regular B12 monitoring needed for long-term deficiency.',
    'Generally well-tolerated. Rarely: nausea, diarrhoea, headache.',
    'வைட்டமின் B12 குறைபாட்டை சிகிச்சையளிக்கிறது. நரம்பு செயல்பாட்டை ஆதரிக்கிறது.',
    '1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் ஒரு முறை.',
    'நீண்ட கால குறைபாட்டிற்கு B12 அளவை கண்காணிக்கவும்.',
    'பொதுவாக நன்கு சகிக்கப்படுகிறது.'
),
(
    'Pregabalin 75mg', 'Pregabalin', 'Anticonvulsant / Nerve Pain', 'Prescription,Nerve pain,Bedtime',
    'Treats nerve pain (neuropathy), fibromyalgia, and as add-on therapy for epilepsy and anxiety.',
    '1 capsule (75mg) twice daily (morning and night), with or without food.',
    'Causes drowsiness — avoid driving. Taper dose to stop; do not stop suddenly.',
    'Dizziness, drowsiness, weight gain, blurred vision, swelling in hands/feet.',
    'நரம்பு வலி (நியூரோபதி), ஃபைப்ரோமியால்ஜியா சிகிச்சை.',
    '1 கேப்சூல் (75mg) காலை மற்றும் இரவு இரு முறை.',
    'தூக்கம் வரலாம் — வாகனம் ஓட்டுவதை தவிர்க்கவும்.',
    'தலைசுற்றல், தூக்கம், எடை அதிகரிப்பு.'
),
(
    'Gabapentin 300mg', 'Gabapentin', 'Anticonvulsant / Nerve Pain', 'Prescription,Nerve pain',
    'Treats nerve pain, epilepsy, and restless legs syndrome.',
    '1 capsule (300mg) 3 times daily (every 8 hours), with or without food.',
    'Do not stop suddenly. Causes drowsiness — avoid driving.',
    'Dizziness, drowsiness, fatigue, weight gain, swelling in extremities.',
    'நரம்பு வலி, கால்-கை வலிப்பு சிகிச்சை.',
    '1 கேப்சூல் (300mg) தினமும் 3 முறை.',
    'திடீரென நிறுத்த வேண்டாம்.',
    'தலைசுற்றல், தூக்கம், சோர்வு.'
),
(
    'Aspirin 75mg', 'Acetylsalicylic Acid', 'Antiplatelet / Analgesic', 'Heart,Blood thinner,Prescription',
    'Low-dose aspirin prevents blood clots, heart attacks, and strokes in high-risk patients.',
    '1 tablet (75mg) after food, once daily.',
    'Always take after food. Avoid if you have stomach ulcers. Inform doctor before surgery.',
    'Stomach upset, nausea, increased bleeding risk.',
    'குறைந்த அளவு ஆஸ்பிரின் இரத்த உறைவு, மாரடைப்பு மற்றும் பக்கவாதத்தை தடுக்கிறது.',
    '1 மாத்திரை (75mg) சாப்பிட்ட பிறகு, தினமும் ஒரு முறை.',
    'எப்போதும் உணவுக்கு பிறகு உட்கொள்ளவும்.',
    'வயிற்று உபாதை, குமட்டல், அதிக இரத்தப்போக்கு அபாயம்.'
),
(
    'Diclofenac 50mg', 'Diclofenac Sodium', 'NSAID', 'Prescription,After food',
    'Treats pain and inflammation in arthritis, sprains, back pain, and dental pain.',
    '1 tablet (50mg) after food, 2-3 times daily or as prescribed.',
    'Take with food. Avoid alcohol. Not for long-term use without doctor supervision.',
    'Stomach upset, nausea, dizziness, headache. Rarely: gastrointestinal bleeding.',
    'மூட்டு வலி, முதுகு வலி, பல் வலி மற்றும் வீக்கத்திற்கு சிகிச்சையளிக்கிறது.',
    '1 மாத்திரை (50mg) சாப்பிட்ட பிறகு, தினமும் 2-3 முறை.',
    'உணவுடன் உட்கொள்ளவும். மது தவிர்க்கவும்.',
    'வயிற்று உபாதை, குமட்டல், தலைசுற்றல்.'
),
(
    'Prednisolone 5mg', 'Prednisolone', 'Corticosteroid', 'Prescription,Steroid,After food',
    'Treats inflammatory conditions, allergic reactions, autoimmune diseases, and severe asthma.',
    'As prescribed. Typically 1-6 tablets daily after food.',
    'Do not stop suddenly after prolonged use. Monitor blood sugar, blood pressure.',
    'Weight gain, fluid retention, mood changes, high blood sugar.',
    'அழற்சி நிலைமைகள், ஒவ்வாமை எதிர்விளைவுகள் சிகிச்சை.',
    'மருத்துவர் பரிந்துரைத்தபடி. சாப்பிட்ட பிறகு.',
    'நீண்ட கால பயன்பாட்டிற்கு பிறகு திடீரென நிறுத்த வேண்டாம்.',
    'எடை அதிகரிப்பு, திரவ தேக்கம், மனநிலை மாற்றங்கள்.'
),
(
    'Sertraline 50mg', 'Sertraline HCl', 'SSRI Antidepressant', 'Prescription,Mental health,Morning',
    'Treats depression, anxiety disorders, panic disorder, OCD, PTSD, and social anxiety.',
    '1 tablet (50mg) once daily in the morning. Full effect may take 4-6 weeks.',
    'Do not stop suddenly — taper as directed. Monitor for mood changes in first weeks.',
    'Nausea, insomnia, diarrhoea, dry mouth, sweating.',
    'மனச்சோர்வு, கவலைக் கோளாறுகள், OCD மற்றும் PTSD சிகிச்சை.',
    '1 மாத்திரை (50mg) காலையில் ஒரு முறை.',
    'திடீரென நிறுத்த வேண்டாம்.',
    'குமட்டல், தூக்கமின்மை, வயிற்றுப்போக்கு.'
),
(
    'Furosemide 40mg', 'Furosemide', 'Loop Diuretic', 'Blood Pressure,Heart,Prescription,Morning',
    'Removes excess fluid from the body. Treats oedema in heart failure, kidney and liver disease.',
    '1 tablet (40mg) in the morning, once daily or as prescribed.',
    'Take in the morning to avoid night-time urination. Monitor electrolytes (potassium).',
    'Increased urination, low potassium, dehydration, muscle cramps, dizziness.',
    'உடலில் இருந்து அதிகப்படியான திரவத்தை அகற்றுகிறது.',
    '1 மாத்திரை (40mg) காலையில், தினமும் ஒரு முறை.',
    'இரவு சிறுநீர் கழிப்பை தவிர்க்க காலையில் உட்கொள்ளவும்.',
    'அதிக சிறுநீர் கழிப்பு, குறைந்த பொட்டாசியம்.'
),
(
    'Iron + Folic Acid', 'Ferrous Sulphate + Folic Acid', 'Haematinic Supplement', 'Supplement,Anaemia,Pregnancy',
    'Treats and prevents iron-deficiency anaemia. Essential during pregnancy and heavy periods.',
    '1 tablet once or twice daily after food, or as prescribed.',
    'Take after food to reduce stomach upset. May darken stools (normal).',
    'Dark stools, stomach upset, nausea, constipation.',
    'இரத்த சோகை சிகிச்சை. கர்ப்ப காலத்தில் அவசியம்.',
    '1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் ஒரு அல்லது இரு முறை.',
    'வயிற்று உபாதையை குறைக்க உணவுக்கு பிறகு உட்கொள்ளவும்.',
    'இருண்ட மலம், வயிற்று உபாதை, குமட்டல்.'
),
(
    'Acyclovir 400mg', 'Acyclovir', 'Antiviral', 'Prescription,Viral infection',
    'Treats herpes simplex infections, shingles (herpes zoster), and chickenpox.',
    '1 tablet (400mg) 3-5 times daily for 5-10 days or as prescribed. Drink plenty of water.',
    'Stay well hydrated. Adjust dose in kidney impairment.',
    'Nausea, diarrhoea, headache, dizziness, rash.',
    'ஹெர்பிஸ் சிம்பிளெக்ஸ் நோய்த்தொற்றுகள் சிகிச்சை.',
    '1 மாத்திரை (400mg) தினமும் 3-5 முறை.',
    'நல்ல ஹைட்ரேஷன் பராமரிக்கவும்.',
    'குமட்டல், வயிற்றுப்போக்கு, தலைவலி.'
),
(
    'Fluconazole 150mg', 'Fluconazole', 'Antifungal', 'Prescription,Fungal infection',
    'Treats fungal infections including vaginal thrush, oral thrush, and skin fungal infections.',
    '1 capsule (150mg) as a single dose for vaginal thrush; for other infections as prescribed.',
    'Inform doctor of liver or kidney problems. Can interact with many medicines.',
    'Nausea, headache, rash, stomach pain.',
    'யோனி, வாய் மற்றும் தோல் பூஞ்சை நோய்த்தொற்றுகளை சிகிச்சையளிக்கிறது.',
    'யோனி தொற்றுக்கு 1 கேப்சூல் (150mg) ஒரு முறை.',
    'கல்லீரல் அல்லது சிறுநீரக பிரச்சனைகளை தெரிவிக்கவும்.',
    'குமட்டல், தலைவலி, தோல் தடிப்பு.'
),
(
    'Montelukast 10mg', 'Montelukast Sodium', 'Leukotriene Inhibitor', 'Asthma,Allergy,Prescription',
    'Prevents asthma attacks and treats seasonal allergies (allergic rhinitis).',
    '1 tablet (10mg) at bedtime, once daily.',
    'Not for acute asthma attacks. Inform doctor of mental health changes.',
    'Headache, stomach pain, diarrhoea, mood/behaviour changes (rare).',
    'ஆஸ்துமா தாக்குதல்களை தடுக்கிறது மற்றும் ஒவ்வாமை மூக்கு அழற்சியை சிகிச்சையளிக்கிறது.',
    '1 மாத்திரை (10mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.',
    'கடுமையான ஆஸ்துமா தாக்குதலுக்கு பயன்படுத்த வேண்டாம்.',
    'தலைவலி, வயிற்று வலி, மனநிலை மாற்றங்கள்.'
),
(
    'Ciprofloxacin 500mg', 'Ciprofloxacin HCl', 'Antibiotic (Fluoroquinolone)', 'Prescription,With water',
    'Treats urinary tract infections, chest infections, typhoid, gastroenteritis, and skin infections.',
    '1 tablet (500mg) twice daily, with plenty of water.',
    'Avoid antacids within 2 hours. Drink plenty of fluids. Stop if tendon/joint pain occurs.',
    'Nausea, diarrhoea, dizziness, headache, rash.',
    'சிறுநீர் பாதை, மார்பு நோய்த்தொற்றுகள், காய்ச்சல் சிகிச்சை.',
    '1 மாத்திரை (500mg) தினமும் இரு முறை, நிறைய தண்ணீருடன்.',
    '2 மணி நேரத்தில் ஆன்டாசிட் எடுக்க வேண்டாம்.',
    'குமட்டல், வயிற்றுப்போக்கு, தலைசுற்றல்.'
),
(
    'Doxycycline 100mg', 'Doxycycline Hyclate', 'Antibiotic (Tetracycline)', 'Prescription,After food',
    'Treats bacterial infections including chest, skin, urinary, and sexually transmitted infections.',
    '1 capsule (100mg) twice daily with plenty of water and food.',
    'Do not lie down for 30 minutes after taking. Avoid sun exposure. Not for children under 8 or pregnant women.',
    'Nausea, vomiting, sun sensitivity, throat irritation.',
    'மார்பு, தோல், சிறுநீர் பாதை நோய்த்தொற்றுகளுக்கு சிகிச்சையளிக்கிறது.',
    '1 கேப்சூல் (100mg) தினமும் இரு முறை உணவு மற்றும் தண்ணீருடன்.',
    'உட்கொண்ட பிறகு 30 நிமிடம் படுக்க வேண்டாம். வெயில் தவிர்க்கவும்.',
    'குமட்டல், வாந்தி, வெயில் உணர்திறன்.'
),
(
    'Metronidazole 400mg', 'Metronidazole', 'Antibiotic / Antiprotozoal', 'Prescription,After food',
    'Treats bacterial and parasitic infections, including amoebic dysentery and dental infections.',
    '1 tablet (400mg) after food, 3 times daily for 5-7 days or as prescribed.',
    'Strictly avoid alcohol during treatment and for 48 hours after.',
    'Nausea, metallic taste, dark urine, headache.',
    'அமீபிக் டிசன்டரி மற்றும் பல் நோய்த்தொற்றுகளுக்கு சிகிச்சை.',
    '1 மாத்திரை (400mg) சாப்பிட்ட பிறகு, தினமும் 3 முறை.',
    'சிகிச்சை மற்றும் அதற்கு 48 மணி நேரம் பிறகும் மது தவிர்க்கவும்.',
    'குமட்டல், உலோக சுவை, இருண்ட சிறுநீர்.'
)
ON CONFLICT DO NOTHING;

// ===================== MEDICINE DATABASE =====================
const MEDICINES = [
    {
    id: 1, name: "Paracetamol 500mg", generic: "Acetaminophen", type: "Analgesic / Antipyretic",
    tags: ["OTC", "Safe for adults"],
    en: {
      purpose: "Relief of mild to moderate pain and reduction of fever.",
      dosage: "1 tablet (500mg) after food, every 4–6 hours as needed. Maximum 8 tablets per day.",
      precautions: "Do not exceed 8 tablets in 24 hours. Avoid alcohol. Do not combine with other paracetamol-containing products.",
      sideEffects: "Rarely causes side effects at recommended doses. Overdose may cause liver damage."
    },
    ta: {
      purpose: "இலேசான முதல் மிதமான வலி நிவாரணம் மற்றும் காய்ச்சல் குறைப்பு.",
      dosage: "1 மாத்திரை (500mg) சாப்பிட்ட பிறகு, 4–6 மணி நேரத்திற்கு ஒரு முறை. ஒரு நாளில் அதிகபட்சம் 8 மாத்திரைகள்.",
      precautions: "24 மணி நேரத்தில் 8 மாத்திரைகளுக்கு மேல் உட்கொள்ள வேண்டாம். மது அருந்துவதை தவிர்க்கவும்.",
      sideEffects: "பரிந்துரைக்கப்பட்ட அளவில் பக்கவிளைவுகள் மிகவும் அரிது. அதிகப்படியான அளவு கல்லீரல் சேதத்தை ஏற்படுத்தலாம்."
    }
  },
  {
    id: 2, name: "Ibuprofen 400mg", generic: "Ibuprofen", type: "NSAID / Anti-inflammatory",
    tags: ["OTC", "After food"],
    en: {
      purpose: "Relieves pain, inflammation, and fever. Used for headaches, body aches, dental pain, and arthritis.",
      dosage: "1 tablet (400mg) after food, every 6–8 hours. Maximum 3 tablets per day.",
      precautions: "Always take with food to protect the stomach. Avoid if you have kidney disease, stomach ulcers, or heart problems. Not suitable for children under 12.",
      sideEffects: "Stomach upset, nausea, heartburn. Rarely: stomach bleeding, kidney issues."
    },
    ta: {
      purpose: "வலி, அழற்சி மற்றும் காய்ச்சல் குறைக்கிறது. தலைவலி, உடல் வலி, பல் வலி, மூட்டு வலிக்கு பயன்படுகிறது.",
      dosage: "1 மாத்திரை (400mg) சாப்பிட்ட பிறகு, 6–8 மணி நேரத்திற்கு ஒரு முறை. ஒரு நாளில் அதிகபட்சம் 3 மாத்திரைகள்.",
      precautions: "வயிற்றை பாதுகாக்க எப்போதும் உணவுடன் உட்கொள்ளவும். சிறுநீரக நோய் அல்லது வயிற்று புண் இருந்தால் தவிர்க்கவும்.",
      sideEffects: "வயிற்று உபாதை, குமட்டல், நெஞ்செரிச்சல். அரிதாக வயிற்று இரத்தப்போக்கு ஏற்படலாம்."
    }
  },
  {
    id: 3, name: "Diclofenac 50mg", generic: "Diclofenac Sodium", type: "NSAID",
    tags: ["Prescription", "After food"],
    en: {
      purpose: "Treats pain and inflammation in conditions like arthritis, sprains, back pain, and dental pain.",
      dosage: "1 tablet (50mg) after food, 2–3 times daily or as prescribed.",
      precautions: "Take with food. Avoid alcohol. Not for long-term use without doctor supervision. Avoid in peptic ulcer disease.",
      sideEffects: "Stomach upset, nausea, dizziness, headache, rash. Rarely: gastrointestinal bleeding."
    },
    ta: {
      purpose: "மூட்டு வலி, முதுகு வலி, பல் வலி மற்றும் வீக்கத்திற்கு சிகிச்சையளிக்கிறது.",
      dosage: "1 மாத்திரை (50mg) சாப்பிட்ட பிறகு, தினமும் 2–3 முறை.",
      precautions: "உணவுடன் உட்கொள்ளவும். மது தவிர்க்கவும். மருத்துவர் இல்லாமல் நீண்ட காலம் பயன்படுத்த வேண்டாம்.",
      sideEffects: "வயிற்று உபாதை, குமட்டல், தலைசுற்றல். அரிதாக வயிற்று இரத்தப்போக்கு."
    }
  },
  // ── ANTIBIOTICS ────────────────────────────────────────────────────────
  {
    id: 4, name: "Amoxicillin 500mg", generic: "Amoxicillin", type: "Antibiotic",
    tags: ["Prescription", "Complete full course"],
    en: {
      purpose: "Treatment of bacterial infections including throat, ear, urinary tract, and chest infections.",
      dosage: "1 capsule (500mg) 3 times daily (every 8 hours), with or without food. Complete the full prescribed course.",
      precautions: "Inform doctor if allergic to penicillin. Complete the full course even if you feel better. Do not take with alcohol.",
      sideEffects: "Diarrhoea, stomach upset, skin rash. Seek medical attention if rash or difficulty breathing occurs."
    },
    ta: {
      purpose: "தொண்டை, காது, சிறுநீர் பாதை மற்றும் மார்பு நோய்த்தொற்றுகளுக்கான சிகிச்சை.",
      dosage: "1 கேப்சூல் (500mg) தினமும் 3 முறை. முழு சிகிச்சை படிப்பை முடிக்கவும்.",
      precautions: "பெனிசிலினுக்கு ஒவ்வாமை இருந்தால் மருத்துவரிடம் தெரிவிக்கவும். நலமாக உணர்ந்தாலும் முழு படிப்பை முடிக்கவும்.",
      sideEffects: "வயிற்றுப்போக்கு, வயிற்று வலி, தோல் தடிப்பு. தடிப்பு அல்லது சுவாசிக்க சிரமம் ஏற்பட்டால் உடனடியாக மருத்துவரை அணுகவும்."
    }
  },
  {
    id: 5, name: "Azithromycin 500mg", generic: "Azithromycin", type: "Antibiotic (Macrolide)",
    tags: ["Prescription", "3-day course"],
    en: {
      purpose: "Treats bacterial infections including respiratory tract infections, ear infections, and some skin infections.",
      dosage: "1 tablet (500mg) once daily for 3 days (or as directed). Can be taken with or without food.",
      precautions: "Complete the full course. Inform doctor of any heart conditions. May interact with antacids.",
      sideEffects: "Nausea, vomiting, diarrhoea, stomach cramps. Rarely causes abnormal heart rhythm."
    },
    ta: {
      purpose: "சுவாச பாதை நோய்த்தொற்றுகள், காது நோய்த்தொற்றுகளுக்கு சிகிச்சையளிக்கிறது.",
      dosage: "1 மாத்திரை (500mg) தினமும் ஒரு முறை 3 நாட்களுக்கு (அல்லது மருத்துவர் கூறியபடி).",
      precautions: "முழு படிப்பை முடிக்கவும். இதய நோய்கள் இருந்தால் மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "குமட்டல், வாந்தி, வயிற்றுப்போக்கு, வயிற்று வலி."
    }
  },
  {
    id: 6, name: "Doxycycline 100mg", generic: "Doxycycline Hyclate", type: "Antibiotic (Tetracycline)",
    tags: ["Prescription", "After food"],
    en: {
      purpose: "Treats bacterial infections including chest, skin, urinary, and sexually transmitted infections.",
      dosage: "1 capsule (100mg) twice daily with plenty of water and food.",
      precautions: "Do not lie down for 30 minutes after taking. Avoid sun exposure — use sunscreen. Not for children under 8 or pregnant women.",
      sideEffects: "Nausea, vomiting, sun sensitivity, throat irritation."
    },
    ta: {
      purpose: "மார்பு, தோல், சிறுநீர் பாதை நோய்த்தொற்றுகளுக்கு சிகிச்சையளிக்கிறது.",
      dosage: "1 கேப்சூல் (100mg) தினமும் இரு முறை உணவு மற்றும் தண்ணீருடன்.",
      precautions: "உட்கொண்ட பிறகு 30 நிமிடம் படுக்க வேண்டாம். வெயில் தவிர்க்கவும். 8 வயதிற்கு குறைந்த குழந்தைகளுக்கு பொருந்தாது.",
      sideEffects: "குமட்டல், வாந்தி, வெயில் உணர்திறன், தொண்டை எரிச்சல்."
    }
  },
  {
    id: 7, name: "Ciprofloxacin 500mg", generic: "Ciprofloxacin HCl", type: "Antibiotic (Fluoroquinolone)",
    tags: ["Prescription", "With water"],
    en: {
      purpose: "Treats urinary tract infections, chest infections, typhoid, gastroenteritis, and skin infections.",
      dosage: "1 tablet (500mg) twice daily, with plenty of water. Can be taken with or without food.",
      precautions: "Avoid antacids within 2 hours. Drink plenty of fluids. May cause tendon rupture — stop if joint/tendon pain occurs.",
      sideEffects: "Nausea, diarrhoea, dizziness, headache, rash. Rarely: tendon problems."
    },
    ta: {
      purpose: "சிறுநீர் பாதை, மார்பு நோய்த்தொற்றுகள், காய்ச்சல், தோல் நோய்த்தொற்றுகளுக்கு சிகிச்சை.",
      dosage: "1 மாத்திரை (500mg) தினமும் இரு முறை, நிறைய தண்ணீருடன்.",
      precautions: "2 மணி நேரத்தில் ஆன்டாசிட் எடுக்க வேண்டாம். நிறைய திரவம் குடிக்கவும்.",
      sideEffects: "குமட்டல், வயிற்றுப்போக்கு, தலைசுற்றல், தலைவலி."
    }
  },
  {
    id: 8, name: "Metronidazole 400mg", generic: "Metronidazole", type: "Antibiotic / Antiprotozoal",
    tags: ["Prescription", "After food"],
    en: {
      purpose: "Treats bacterial and parasitic infections, including amoebic dysentery, giardiasis, and dental infections.",
      dosage: "1 tablet (400mg) after food, 3 times daily for 5–7 days or as prescribed.",
      precautions: "Strictly avoid alcohol during treatment and for 48 hours after. May cause a metallic taste in the mouth.",
      sideEffects: "Nausea, metallic taste, dark urine, headache. Avoid alcohol to prevent severe reactions."
    },
    ta: {
      purpose: "அமீபிக் டிசன்டரி, ஜியார்டியா மற்றும் பல் நோய்த்தொற்றுகளுக்கு சிகிச்சை.",
      dosage: "1 மாத்திரை (400mg) சாப்பிட்ட பிறகு, தினமும் 3 முறை 5–7 நாட்களுக்கு.",
      precautions: "சிகிச்சை மற்றும் அதற்கு 48 மணி நேரம் பிறகும் கட்டாயமாக மது தவிர்க்கவும்.",
      sideEffects: "குமட்டல், உலோக சுவை, இருண்ட சிறுநீர், தலைவலி."
    }
  },
  // ── ANTIDIABETICS ──────────────────────────────────────────────────────
  {
    id: 9, name: "Metformin 500mg", generic: "Metformin HCl", type: "Antidiabetic",
    tags: ["Prescription", "Diabetes"],
    en: {
      purpose: "Helps control blood sugar levels in patients with type 2 diabetes.",
      dosage: "1 tablet (500mg) with meals, 2 times daily. Swallow whole with a full glass of water.",
      precautions: "Take with food to reduce stomach upset. Regular blood sugar monitoring required. Avoid excessive alcohol. Inform doctor before surgery or imaging tests.",
      sideEffects: "Nausea, vomiting, diarrhoea, stomach upset (usually improves after a few weeks)."
    },
    ta: {
      purpose: "வகை 2 நீரிழிவு நோயாளிகளில் இரத்த சர்க்கரை அளவை கட்டுப்படுத்த உதவுகிறது.",
      dosage: "1 மாத்திரை (500mg) சாப்பிட்ட பிறகு, தினமும் 2 முறை.",
      precautions: "வயிற்று உபாதையை குறைக்க உணவுடன் உட்கொள்ளவும். தொடர் இரத்த சர்க்கரை கண்காணிப்பு தேவை.",
      sideEffects: "குமட்டல், வாந்தி, வயிற்றுப்போக்கு (பொதுவாக சில வாரங்களில் குணமாகும்)."
    }
  },
  {
    id: 10, name: "Glimepiride 1mg", generic: "Glimepiride", type: "Antidiabetic (Sulfonylurea)",
    tags: ["Prescription", "Diabetes", "Before food"],
    en: {
      purpose: "Stimulates the pancreas to produce more insulin. Used in type 2 diabetes management.",
      dosage: "1 tablet (1mg) before breakfast, once daily or as prescribed.",
      precautions: "Do not skip meals after taking this medicine. Monitor blood sugar regularly. Avoid alcohol. Adjust dose during illness.",
      sideEffects: "Low blood sugar (hypoglycaemia), dizziness, sweating, weight gain, nausea."
    },
    ta: {
      purpose: "கணையத்தை இன்சுலின் உற்பத்தி செய்ய தூண்டுகிறது. வகை 2 நீரிழிவு நிர்வாகத்தில் பயன்படுகிறது.",
      dosage: "1 மாத்திரை (1mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.",
      precautions: "இந்த மருந்தை உட்கொண்ட பிறகு உணவை தவிர்க்க வேண்டாம். இரத்த சர்க்கரையை கண்காணிக்கவும்.",
      sideEffects: "இரத்த சர்க்கரை குறைவு, தலைசுற்றல், வியர்வை, எடை அதிகரிப்பு."
    }
  },
  {
    id: 11, name: "Sitagliptin 100mg", generic: "Sitagliptin Phosphate", type: "Antidiabetic (DPP-4 Inhibitor)",
    tags: ["Prescription", "Diabetes"],
    en: {
      purpose: "Improves blood sugar control in type 2 diabetes by enhancing natural insulin release.",
      dosage: "1 tablet (100mg) once daily, with or without food.",
      precautions: "Inform doctor of kidney conditions — dose may need adjustment. Watch for signs of pancreatitis (severe stomach pain).",
      sideEffects: "Sore throat, runny nose, headache, nausea. Rare: pancreatitis, joint pain."
    },
    ta: {
      purpose: "வகை 2 நீரிழிவு நோயில் இயற்கை இன்சுலின் வெளியீட்டை மேம்படுத்துகிறது.",
      dosage: "1 மாத்திரை (100mg) தினமும் ஒரு முறை, உணவுடன் அல்லது இல்லாமல்.",
      precautions: "சிறுநீரக நிலைமைகளை மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "தொண்டை வலி, மூக்கு ஒழுகுதல், தலைவலி, குமட்டல்."
    }
  },
  // ── BLOOD PRESSURE / CARDIOVASCULAR ───────────────────────────────────
  {
    id: 12, name: "Amlodipine 5mg", generic: "Amlodipine Besylate", type: "Calcium Channel Blocker",
    tags: ["Blood Pressure", "Prescription"],
    en: {
      purpose: "Treats high blood pressure (hypertension) and chest pain (angina). Helps protect the heart and kidneys.",
      dosage: "1 tablet (5mg) once daily, with or without food. Take at the same time every day.",
      precautions: "Do not stop taking without doctor's advice. Monitor blood pressure regularly. Rise slowly from sitting/lying to avoid dizziness.",
      sideEffects: "Swelling in feet/ankles, flushing, headache, dizziness, tiredness."
    },
    ta: {
      purpose: "உயர் இரத்த அழுத்தம் மற்றும் மார்பு வலிக்கு சிகிச்சையளிக்கிறது.",
      dosage: "1 மாத்திரை (5mg) தினமும் ஒரு முறை. ஒவ்வொரு நாளும் ஒரே நேரத்தில் உட்கொள்ளவும்.",
      precautions: "மருத்துவரின் ஆலோசனையின்றி நிறுத்த வேண்டாம். இரத்த அழுத்தத்தை தொடர்ந்து கண்காணிக்கவும்.",
      sideEffects: "கால்/கணுக்கால் வீக்கம், தலைவலி, மயக்கம், சோர்வு."
    }
  },
  {
    id: 13, name: "Losartan 50mg", generic: "Losartan Potassium", type: "ARB / Antihypertensive",
    tags: ["Blood Pressure", "Prescription"],
    en: {
      purpose: "Controls high blood pressure and protects the kidneys in diabetic patients.",
      dosage: "1 tablet (50mg) once daily, with or without food.",
      precautions: "Do not use in pregnancy. Monitor kidney function and potassium levels. Avoid potassium supplements unless directed.",
      sideEffects: "Dizziness, fatigue, high potassium, nasal congestion, back pain."
    },
    ta: {
      purpose: "உயர் இரத்த அழுத்தத்தை கட்டுப்படுத்துகிறது மற்றும் நீரிழிவு நோயாளிகளில் சிறுநீரகங்களை பாதுகாக்கிறது.",
      dosage: "1 மாத்திரை (50mg) தினமும் ஒரு முறை.",
      precautions: "கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம். சிறுநீரக செயல்பாட்டை கண்காணிக்கவும்.",
      sideEffects: "தலைசுற்றல், சோர்வு, அதிக பொட்டாசியம், மூக்கடைப்பு."
    }
  },
  {
    id: 14, name: "Telmisartan 40mg", generic: "Telmisartan", type: "ARB / Antihypertensive",
    tags: ["Blood Pressure", "Prescription"],
    en: {
      purpose: "Manages high blood pressure and reduces the risk of cardiovascular events.",
      dosage: "1 tablet (40mg) once daily at the same time each day, with or without food.",
      precautions: "Not for use in pregnancy. Monitor kidney function. Avoid in bilateral renal artery stenosis.",
      sideEffects: "Dizziness, back pain, sinus infection, diarrhoea."
    },
    ta: {
      purpose: "உயர் இரத்த அழுத்தத்தை நிர்வகிக்கிறது மற்றும் இதய நோய் அபாயத்தை குறைக்கிறது.",
      dosage: "1 மாத்திரை (40mg) தினமும் ஒரு முறை.",
      precautions: "கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம். சிறுநீரக செயல்பாட்டை கண்காணிக்கவும்.",
      sideEffects: "தலைசுற்றல், முதுகு வலி, சைனஸ் தொற்று, வயிற்றுப்போக்கு."
    }
  },
  {
    id: 15, name: "Atenolol 50mg", generic: "Atenolol", type: "Beta Blocker",
    tags: ["Blood Pressure", "Heart", "Prescription"],
    en: {
      purpose: "Treats high blood pressure, angina, and abnormal heart rhythms. Used after heart attacks.",
      dosage: "1 tablet (50mg) once daily, with or without food. Always take at the same time each day.",
      precautions: "Do not stop suddenly — taper as directed. Not for asthmatics. Monitor pulse rate.",
      sideEffects: "Tiredness, cold hands/feet, slow heartbeat, dizziness, sleep disturbance."
    },
    ta: {
      purpose: "உயர் இரத்த அழுத்தம், மார்பு வலி மற்றும் இதய துடிப்பு அசாதாரணங்களுக்கு சிகிச்சை.",
      dosage: "1 மாத்திரை (50mg) தினமும் ஒரு முறை.",
      precautions: "திடீரென நிறுத்த வேண்டாம். ஆஸ்துமா நோயாளிகளுக்கு ஏற்றதல்ல.",
      sideEffects: "சோர்வு, கை/கால் குளிர்ச்சி, மெதுவான இதயத் துடிப்பு, தலைசுற்றல்."
    }
  },
  {
    id: 16, name: "Ramipril 5mg", generic: "Ramipril", type: "ACE Inhibitor",
    tags: ["Blood Pressure", "Heart", "Prescription"],
    en: {
      purpose: "Lowers blood pressure, treats heart failure, and protects kidneys in diabetes.",
      dosage: "1 tablet (5mg) once daily, with or without food. Best taken at the same time each day.",
      precautions: "Do not use in pregnancy. Watch for persistent dry cough (common side effect). Monitor kidney function and potassium.",
      sideEffects: "Dry cough, dizziness, elevated potassium, first-dose hypotension, headache."
    },
    ta: {
      purpose: "இரத்த அழுத்தத்தை குறைக்கிறது, இதய செயலிழப்பு சிகிச்சை மற்றும் நீரிழிவு நோயில் சிறுநீரகங்களை பாதுகாக்கிறது.",
      dosage: "1 மாத்திரை (5mg) தினமும் ஒரு முறை.",
      precautions: "கர்ப்ப காலத்தில் பயன்படுத்த வேண்டாம். தொடர்ந்து வரும் வறண்ட இருமலை கவனிக்கவும்.",
      sideEffects: "வறண்ட இருமல், தலைசுற்றல், அதிக பொட்டாசியம், தலைவலி."
    }
  },
  // ── CHOLESTEROL ────────────────────────────────────────────────────────
  {
    id: 17, name: "Atorvastatin 10mg", generic: "Atorvastatin", type: "Statin / Cholesterol",
    tags: ["Prescription", "Evening dose"],
    en: {
      purpose: "Lowers bad cholesterol (LDL) and reduces risk of heart disease and stroke.",
      dosage: "1 tablet (10mg) at bedtime or in the evening, once daily. Can be taken with or without food.",
      precautions: "Avoid grapefruit juice. Regular liver function tests needed. Report muscle pain or weakness immediately.",
      sideEffects: "Muscle pain, weakness, headache, nausea, joint pain."
    },
    ta: {
      purpose: "கெட்ட கொலஸ்ட்ரால் (LDL) ஐ குறைக்கிறது மற்றும் இதய நோய் வருவதை குறைக்கிறது.",
      dosage: "1 மாத்திரை (10mg) படுக்கைக்கு முன் அல்லது மாலையில், தினமும் ஒரு முறை.",
      precautions: "திராட்சை பழச்சாறு தவிர்க்கவும். கல்லீரல் சோதனை தேவை. தசை வலி இருந்தால் உடனடியாக மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "தசை வலி, பலவீனம், தலைவலி, குமட்டல்."
    }
  },
  {
    id: 18, name: "Rosuvastatin 10mg", generic: "Rosuvastatin Calcium", type: "Statin / Cholesterol",
    tags: ["Prescription", "Any time"],
    en: {
      purpose: "Reduces LDL (bad) cholesterol and triglycerides; increases HDL (good) cholesterol.",
      dosage: "1 tablet (10mg) once daily at any time, with or without food.",
      precautions: "Report unexplained muscle pain immediately. Avoid in liver disease or pregnancy. Regular cholesterol testing recommended.",
      sideEffects: "Muscle pain, headache, constipation, nausea, dizziness."
    },
    ta: {
      purpose: "கெட்ட கொலஸ்ட்ரால் (LDL) மற்றும் ட்ரைகிளிசரைடுகளை குறைக்கிறது; நல்ல கொலஸ்ட்ரால் (HDL) ஐ அதிகரிக்கிறது.",
      dosage: "1 மாத்திரை (10mg) தினமும் ஒரு முறை, எந்த நேரத்திலும்.",
      precautions: "விவரிக்க முடியாத தசை வலியை உடனடியாக தெரிவிக்கவும். கல்லீரல் நோய் அல்லது கர்ப்ப காலத்தில் தவிர்க்கவும்.",
      sideEffects: "தசை வலி, தலைவலி, மலச்சிக்கல், குமட்டல், தலைசுற்றல்."
    }
  },
  // ── GASTROINTESTINAL ───────────────────────────────────────────────────
  {
    id: 19, name: "Omeprazole 20mg", generic: "Omeprazole", type: "Proton Pump Inhibitor",
    tags: ["Acidity", "Before food"],
    en: {
      purpose: "Reduces stomach acid. Used for heartburn, acid reflux, stomach ulcers, and gastritis.",
      dosage: "1 capsule (20mg) before breakfast, once daily. Swallow whole; do not crush or chew.",
      precautions: "Do not take for more than 14 days without consulting a doctor. Inform doctor if symptoms persist after 2 weeks.",
      sideEffects: "Headache, stomach pain, nausea, diarrhoea, constipation."
    },
    ta: {
      purpose: "வயிற்று அமிலத்தை குறைக்கிறது. நெஞ்செரிச்சல், அமிலப் பின்னிழுப்பு, வயிற்று புண்களுக்கு பயன்படுகிறது.",
      dosage: "1 கேப்சூல் (20mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.",
      precautions: "மருத்துவரை ஆலோசிக்காமல் 14 நாட்களுக்கு மேல் உட்கொள்ள வேண்டாம்.",
      sideEffects: "தலைவலி, வயிற்று வலி, குமட்டல், வயிற்றுப்போக்கு."
    }
  },
  {
    id: 20, name: "Pantoprazole 40mg", generic: "Pantoprazole Sodium", type: "Proton Pump Inhibitor",
    tags: ["Acidity", "Before food"],
    en: {
      purpose: "Reduces stomach acid for heartburn, acid reflux, GERD, and stomach/duodenal ulcers.",
      dosage: "1 tablet (40mg) before breakfast, once daily. Swallow whole with water.",
      precautions: "Inform doctor about long-term use. May reduce magnesium/B12 levels over time. Can mask symptoms of stomach cancer.",
      sideEffects: "Headache, diarrhoea, nausea, stomach pain, flatulence."
    },
    ta: {
      purpose: "நெஞ்செரிச்சல், GERD, வயிற்று புண்களுக்கு வயிற்று அமிலத்தை குறைக்கிறது.",
      dosage: "1 மாத்திரை (40mg) காலை உணவுக்கு முன், தினமும் ஒரு முறை.",
      precautions: "நீண்ட கால பயன்பாட்டை மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "தலைவலி, வயிற்றுப்போக்கு, குமட்டல், வயிற்று வலி."
    }
  },
  {
    id: 21, name: "Ranitidine 150mg", generic: "Ranitidine HCl", type: "H2 Blocker",
    tags: ["Acidity", "OTC"],
    en: {
      purpose: "Reduces stomach acid to treat heartburn, acid indigestion, and stomach ulcers.",
      dosage: "1 tablet (150mg) twice daily or as prescribed. Can be taken with or without food.",
      precautions: "Inform doctor about kidney problems. Avoid in porphyria. Check with doctor if symptoms persist.",
      sideEffects: "Headache, dizziness, constipation, nausea, rash."
    },
    ta: {
      purpose: "நெஞ்செரிச்சல், அஜீரணம் மற்றும் வயிற்று புண்களுக்கு வயிற்று அமிலத்தை குறைக்கிறது.",
      dosage: "1 மாத்திரை (150mg) தினமும் இரு முறை.",
      precautions: "சிறுநீரக பிரச்சனைகளை மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "தலைவலி, தலைசுற்றல், மலச்சிக்கல், குமட்டல், தோல் தடிப்பு."
    }
  },
  {
    id: 22, name: "Domperidone 10mg", generic: "Domperidone", type: "Prokinetic / Antiemetic",
    tags: ["Nausea", "Before food"],
    en: {
      purpose: "Relieves nausea, vomiting, and bloating. Helps food move through the stomach faster.",
      dosage: "1 tablet (10mg) 30 minutes before meals, up to 3 times daily. Do not exceed 3 days of use without review.",
      precautions: "Not for long-term use. Avoid in heart rhythm disorders. Do not exceed recommended dose.",
      sideEffects: "Dry mouth, headache, diarrhoea, abdominal cramps, rarely abnormal heart rhythm."
    },
    ta: {
      purpose: "குமட்டல், வாந்தி மற்றும் வயிறு உப்பசத்தை நிவாரணப்படுத்துகிறது.",
      dosage: "1 மாத்திரை (10mg) சாப்பிடுவதற்கு 30 நிமிடம் முன், தினமும் 3 முறை வரை.",
      precautions: "நீண்ட கால பயன்பாட்டிற்கு ஏற்றதல்ல. இதய வால்வு கோளாறில் தவிர்க்கவும்.",
      sideEffects: "வாய் வறட்சி, தலைவலி, வயிற்றுப்போக்கு, வயிற்று வலி."
    }
  },
  {
    id: 23, name: "Ondansetron 4mg", generic: "Ondansetron HCl", type: "Antiemetic (5-HT3 Antagonist)",
    tags: ["Nausea", "Vomiting"],
    en: {
      purpose: "Prevents and treats nausea and vomiting caused by chemotherapy, radiotherapy, or surgery.",
      dosage: "1 tablet (4mg) 1–2 hours before chemotherapy or surgery, then every 8 hours for 1–2 days.",
      precautions: "Inform doctor of heart rhythm conditions. Use with caution in liver disease. Can cause constipation.",
      sideEffects: "Headache, constipation, dizziness, warm sensation, rarely abnormal heart rhythm."
    },
    ta: {
      purpose: "கீமோதெரபி, கதிர்வீச்சு சிகிச்சை அல்லது அறுவை சிகிச்சையால் ஏற்படும் குமட்டல் மற்றும் வாந்தியை தடுக்கிறது.",
      dosage: "1 மாத்திரை (4mg) சிகிச்சைக்கு 1–2 மணி நேரம் முன், பிறகு 8 மணி நேரத்திற்கு ஒரு முறை.",
      precautions: "இதய வால்வு நிலைமைகளை தெரிவிக்கவும். கல்லீரல் நோயில் கவனமாக பயன்படுத்தவும்.",
      sideEffects: "தலைவலி, மலச்சிக்கல், தலைசுற்றல்."
    }
  },
  // ── ANTIHISTAMINES / ALLERGY ───────────────────────────────────────────
  {
    id: 24, name: "Cetirizine 10mg", generic: "Cetirizine HCl", type: "Antihistamine",
    tags: ["Allergy", "OTC"],
    en: {
      purpose: "Relieves allergy symptoms such as runny nose, sneezing, itchy eyes, and skin rashes.",
      dosage: "1 tablet (10mg) at bedtime, once daily. Can be taken with or without food.",
      precautions: "May cause drowsiness — avoid driving or operating machinery. Avoid alcohol.",
      sideEffects: "Drowsiness, dry mouth, headache, dizziness. Usually well-tolerated."
    },
    ta: {
      purpose: "மூக்கு ஒழுகுதல், தும்மல், கண் எரிச்சல் மற்றும் தோல் தடிப்பு போன்ற ஒவ்வாமை அறிகுறிகளை நிவாரணப்படுத்துகிறது.",
      dosage: "1 மாத்திரை (10mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.",
      precautions: "தூக்கம் வரலாம் — வாகனம் ஓட்டுவதை தவிர்க்கவும்.",
      sideEffects: "தூக்கம், வாய் வறட்சி, தலைவலி, மயக்கம்."
    }
  },
  {
    id: 25, name: "Levocetrizine 5mg", generic: "Levocetirizine HCl", type: "Antihistamine (2nd Gen)",
    tags: ["Allergy", "OTC"],
    en: {
      purpose: "Relieves allergic rhinitis, chronic hives (urticaria), and other allergy symptoms.",
      dosage: "1 tablet (5mg) at bedtime, once daily.",
      precautions: "Less sedating than older antihistamines but may still cause drowsiness. Reduce dose in kidney impairment.",
      sideEffects: "Drowsiness, dry mouth, headache, fatigue."
    },
    ta: {
      purpose: "ஒவ்வாமை மூக்கு அழற்சி, நாள்பட்ட படை நோய் மற்றும் ஒவ்வாமை அறிகுறிகளை நிவாரணப்படுத்துகிறது.",
      dosage: "1 மாத்திரை (5mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.",
      precautions: "சிறுநீரக குறைபாட்டில் அளவை குறைக்கவும்.",
      sideEffects: "தூக்கம், வாய் வறட்சி, தலைவலி, சோர்வு."
    }
  },
  // ── RESPIRATORY ────────────────────────────────────────────────────────
  {
    id: 26, name: "Salbutamol 4mg", generic: "Salbutamol Sulphate", type: "Bronchodilator",
    tags: ["Asthma", "COPD", "Prescription"],
    en: {
      purpose: "Relieves and prevents bronchospasm in asthma and COPD. Opens the airways for easier breathing.",
      dosage: "1 tablet (4mg) 3–4 times daily or as prescribed. Inhaler: 1–2 puffs as needed.",
      precautions: "Not a substitute for long-term asthma control medicines. Inform doctor of heart conditions, diabetes, or thyroid issues.",
      sideEffects: "Tremor, palpitations, headache, increased heart rate, muscle cramps."
    },
    ta: {
      purpose: "ஆஸ்துமா மற்றும் COPD இல் சுவாச குழாய் சுருக்கத்தை நிவாரணப்படுத்துகிறது.",
      dosage: "1 மாத்திரை (4mg) தினமும் 3–4 முறை. இன்ஹேலர்: தேவையான போது 1–2 பஃப்.",
      precautions: "நீண்ட கால ஆஸ்துமா கட்டுப்பாட்டிற்கு மட்டுமே நம்பாதீர்கள். இதய நோய், நீரிழிவு தெரிவிக்கவும்.",
      sideEffects: "நடுக்கம், படபடப்பு, தலைவலி, அதிகரித்த இதயத் துடிப்பு."
    }
  },
  {
    id: 27, name: "Montelukast 10mg", generic: "Montelukast Sodium", type: "Leukotriene Inhibitor",
    tags: ["Asthma", "Allergy", "Prescription"],
    en: {
      purpose: "Prevents asthma attacks and treats seasonal allergies (allergic rhinitis).",
      dosage: "1 tablet (10mg) at bedtime, once daily.",
      precautions: "Not for acute asthma attacks. Inform doctor of mental health changes (mood, anxiety, depression).",
      sideEffects: "Headache, stomach pain, diarrhoea, mood/behaviour changes (rare but important)."
    },
    ta: {
      purpose: "ஆஸ்துமா தாக்குதல்களை தடுக்கிறது மற்றும் ஒவ்வாமை மூக்கு அழற்சியை சிகிச்சையளிக்கிறது.",
      dosage: "1 மாத்திரை (10mg) படுக்கைக்கு முன், தினமும் ஒரு முறை.",
      precautions: "கடுமையான ஆஸ்துமா தாக்குதலுக்கு பயன்படுத்த வேண்டாம். மனநிலை மாற்றங்களை மருத்துவரிடம் தெரிவிக்கவும்.",
      sideEffects: "தலைவலி, வயிற்று வலி, வயிற்றுப்போக்கு, மனநிலை மாற்றங்கள்."
    }
  },
  // ── THYROID ────────────────────────────────────────────────────────────
  {
    id: 28, name: "Levothyroxine 50mcg", generic: "Levothyroxine Sodium", type: "Thyroid Hormone",
    tags: ["Thyroid", "Before food", "Prescription"],
    en: {
      purpose: "Treats hypothyroidism (underactive thyroid). Replaces or supplements natural thyroid hormones.",
      dosage: "1 tablet (50mcg) on an empty stomach, 30–60 minutes before breakfast, once daily.",
      precautions: "Take on an empty stomach. Avoid calcium, antacids, or iron within 4 hours. Regular thyroid function tests needed.",
      sideEffects: "If dose is too high: palpitations, sweating, weight loss, tremors, insomnia."
    },
    ta: {
      purpose: "ஹைப்போதைராய்டிசம் (குறைவான தைராய்டு) சிகிச்சை. இயற்கை தைராய்டு ஹார்மோன்களை மாற்றுகிறது.",
      dosage: "1 மாத்திரை (50mcg) காலை உணவுக்கு 30–60 நிமிடம் முன், வெறும் வயிற்றில், தினமும் ஒரு முறை.",
      precautions: "வெறும் வயிற்றில் உட்கொள்ளவும். 4 மணி நேரத்தில் கால்சியம் அல்லது இரும்பு எடுக்க வேண்டாம்.",
      sideEffects: "அளவு அதிகமானால்: படபடப்பு, வியர்வை, எடை இழப்பு, நடுக்கம்."
    }
  },
  // ── VITAMINS & SUPPLEMENTS ─────────────────────────────────────────────
  {
    id: 29, name: "Vitamin D3 60000 IU", generic: "Cholecalciferol", type: "Vitamin Supplement",
    tags: ["Supplement", "Weekly"],
    en: {
      purpose: "Treats and prevents Vitamin D deficiency. Supports bone health, immunity, and muscle function.",
      dosage: "1 sachet/capsule (60,000 IU) once a week for 8–12 weeks, or as prescribed. Take with milk or fatty food.",
      precautions: "Do not take daily high doses without monitoring. Excess can cause toxicity. Regular Vitamin D levels check recommended.",
      sideEffects: "Usually safe. Overdose may cause nausea, weakness, excessive urination, confusion."
    },
    ta: {
      purpose: "வைட்டமின் D குறைபாட்டை சிகிச்சையளிக்கிறது. எலும்பு ஆரோக்கியம், நோய் எதிர்ப்பு சக்தியை ஆதரிக்கிறது.",
      dosage: "1 சாஷே/கேப்சூல் (60,000 IU) வாரம் ஒரு முறை, 8–12 வாரங்களுக்கு. பால் அல்லது கொழுப்பு உணவுடன் உட்கொள்ளவும்.",
      precautions: "கண்காணிப்பு இல்லாமல் அதிக அளவு தினமும் எடுக்க வேண்டாம்.",
      sideEffects: "பொதுவாக பாதுகாப்பானது. அதிக அளவு குமட்டல், பலவீனம் ஏற்படலாம்."
    }
  },
  {
    id: 30, name: "Calcium + Vitamin D3", generic: "Calcium Carbonate + Cholecalciferol", type: "Mineral Supplement",
    tags: ["Supplement", "After food"],
    en: {
      purpose: "Prevents and treats calcium deficiency. Supports bone strength and prevents osteoporosis.",
      dosage: "1 tablet after food, twice daily, or as prescribed. Chew or swallow with water.",
      precautions: "Take after food for better absorption. Maintain adequate fluid intake. Avoid in hypercalcaemia.",
      sideEffects: "Constipation, gas, bloating. Rarely: kidney stones with excessive use."
    },
    ta: {
      purpose: "கால்சியம் குறைபாட்டை தடுக்கிறது மற்றும் சிகிச்சையளிக்கிறது. எலும்பு வலிமையை ஆதரிக்கிறது.",
      dosage: "1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் இரு முறை.",
      precautions: "சிறந்த உறிஞ்சுதலுக்கு உணவுக்கு பிறகு உட்கொள்ளவும்.",
      sideEffects: "மலச்சிக்கல், வாயு, வயிறு உப்பசம். அரிதாக சிறுநீரக கற்கள்."
    }
  },
  {
    id: 31, name: "Iron + Folic Acid", generic: "Ferrous Sulphate + Folic Acid", type: "Haematinic Supplement",
    tags: ["Supplement", "Anaemia", "Pregnancy"],
    en: {
      purpose: "Treats and prevents iron-deficiency anaemia. Essential during pregnancy and in women with heavy periods.",
      dosage: "1 tablet once or twice daily after food, or as prescribed.",
      precautions: "Take after food to reduce stomach upset. May darken stools (normal). Avoid tea, coffee, or antacids within 2 hours.",
      sideEffects: "Dark stools, stomach upset, nausea, constipation."
    },
    ta: {
      purpose: "இரத்த சோகை சிகிச்சை. கர்ப்ப காலத்தில் மற்றும் அதிக மாதவிடாய் உள்ள பெண்களுக்கு அவசியம்.",
      dosage: "1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் ஒரு அல்லது இரு முறை.",
      precautions: "வயிற்று உபாதையை குறைக்க உணவுக்கு பிறகு உட்கொள்ளவும். மலம் இருண்டு போவது சாதாரணம்.",
      sideEffects: "இருண்ட மலம், வயிற்று உபாதை, குமட்டல், மலச்சிக்கல்."
    }
  },
  {
    id: 32, name: "Methylcobalamin 500mcg", generic: "Methylcobalamin (Vitamin B12)", type: "Vitamin Supplement",
    tags: ["Supplement", "Nerve health"],
    en: {
      purpose: "Treats Vitamin B12 deficiency. Supports nerve function, red blood cell formation, and brain health.",
      dosage: "1 tablet once daily after food, or as prescribed.",
      precautions: "Safe for most people. Regular B12 levels monitoring needed for long-term deficiency management.",
      sideEffects: "Generally well-tolerated. Rarely: nausea, diarrhoea, headache."
    },
    ta: {
      purpose: "வைட்டமின் B12 குறைபாட்டை சிகிச்சையளிக்கிறது. நரம்பு செயல்பாடு, இரத்த அணு உருவாக்கத்தை ஆதரிக்கிறது.",
      dosage: "1 மாத்திரை சாப்பிட்ட பிறகு, தினமும் ஒரு முறை.",
      precautions: "நீண்ட கால குறைபாட்டிற்கு B12 அளவை கண்காணிக்கவும்.",
      sideEffects: "பொதுவாக நன்கு சகிக்கப்படுகிறது. அரிதாக குமட்டல், வயிற்றுப்போக்கு."
    }
  },
  // ── PAIN / NERVE ───────────────────────────────────────────────────────
  {
    id: 33, name: "Pregabalin 75mg", generic: "Pregabalin", type: "Anticonvulsant / Nerve Pain",
    tags: ["Prescription", "Nerve pain", "Bedtime"],
    en: {
      purpose: "Treats nerve pain (neuropathy), fibromyalgia, and as add-on therapy for epilepsy and anxiety.",
      dosage: "1 capsule (75mg) twice daily (morning and night), with or without food. Do not stop abruptly.",
      precautions: "Causes drowsiness — avoid driving. Taper dose to stop; do not stop suddenly. Inform doctor of kidney problems.",
      sideEffects: "Dizziness, drowsiness, weight gain, blurred vision, swelling in hands/feet."
    },
    ta: {
      purpose: "நரம்பு வலி (நியூரோபதி), ஃபைப்ரோமியால்ஜியா மற்றும் கால்-கை வலிப்பு சிகிச்சை.",
      dosage: "1 கேப்சூல் (75mg) காலை மற்றும் இரவு இரு முறை. திடீரென நிறுத்த வேண்டாம்.",
      precautions: "தூக்கம் வரலாம் — வாகனம் ஓட்டுவதை தவிர்க்கவும். மெதுவாக குறைத்து நிறுத்தவும்.",
      sideEffects: "தலைசுற்றல், தூக்கம், எடை அதிகரிப்பு, மங்கலான பார்வை."
    }
  },
  {
    id: 34, name: "Gabapentin 300mg", generic: "Gabapentin", type: "Anticonvulsant / Nerve Pain",
    tags: ["Prescription", "Nerve pain"],
    en: {
      purpose: "Treats nerve pain, epilepsy, and restless legs syndrome.",
      dosage: "1 capsule (300mg) 3 times daily (every 8 hours), with or without food.",
      precautions: "Do not stop suddenly. Causes drowsiness — avoid driving. May affect kidney patients — dose adjustment needed.",
      sideEffects: "Dizziness, drowsiness, fatigue, weight gain, swelling in extremities."
    },
    ta: {
      purpose: "நரம்பு வலி, கால்-கை வலிப்பு மற்றும் ரெஸ்ட்லெஸ் லெக்ஸ் சிண்ட்ரோம் சிகிச்சை.",
      dosage: "1 கேப்சூல் (300mg) தினமும் 3 முறை.",
      precautions: "திடீரென நிறுத்த வேண்டாம். வாகனம் ஓட்டுவதை தவிர்க்கவும்.",
      sideEffects: "தலைசுற்றல், தூக்கம், சோர்வு, எடை அதிகரிப்பு."
    }
  },
  // ── ANTIDEPRESSANTS / CNS ──────────────────────────────────────────────
  {
    id: 35, name: "Sertraline 50mg", generic: "Sertraline HCl", type: "SSRI Antidepressant",
    tags: ["Prescription", "Mental health", "Morning"],
    en: {
      purpose: "Treats depression, anxiety disorders, panic disorder, OCD, PTSD, and social anxiety.",
      dosage: "1 tablet (50mg) once daily in the morning, with or without food. Full effect may take 4–6 weeks.",
      precautions: "Do not stop suddenly — taper as directed. Inform doctor of all other medicines (especially MAOIs). Monitor for mood changes in first weeks.",
      sideEffects: "Nausea, insomnia, diarrhoea, dry mouth, sweating, sexual dysfunction."
    },
    ta: {
      purpose: "மனச்சோர்வு, கவலைக் கோளாறுகள், பீதி கோளாறு, OCD மற்றும் PTSD சிகிச்சை.",
      dosage: "1 மாத்திரை (50mg) காலையில் ஒரு முறை. முழு விளைவு 4–6 வாரங்களில் தெரியும்.",
      precautions: "திடீரென நிறுத்த வேண்டாம். முதல் வாரங்களில் மனநிலை மாற்றங்களை கண்காணிக்கவும்.",
      sideEffects: "குமட்டல், தூக்கமின்மை, வயிற்றுப்போக்கு, வாய் வறட்சி."
    }
  },
  // ── DIURETICS ──────────────────────────────────────────────────────────
  {
    id: 36, name: "Furosemide 40mg", generic: "Furosemide", type: "Loop Diuretic",
    tags: ["Blood Pressure", "Heart", "Prescription", "Morning"],
    en: {
      purpose: "Removes excess fluid from the body. Treats oedema (swelling) in heart failure, kidney disease, and liver disease.",
      dosage: "1 tablet (40mg) in the morning, once daily or as prescribed. Take with food.",
      precautions: "Take in the morning to avoid night-time urination. Monitor electrolytes (potassium). Avoid potassium-poor diet.",
      sideEffects: "Increased urination, low potassium, dehydration, muscle cramps, dizziness."
    },
    ta: {
      purpose: "உடலில் இருந்து அதிகப்படியான திரவத்தை அகற்றுகிறது. இதய செயலிழப்பு, சிறுநீரக நோயில் வீக்கத்தை சிகிச்சையளிக்கிறது.",
      dosage: "1 மாத்திரை (40mg) காலையில், தினமும் ஒரு முறை.",
      precautions: "இரவு சிறுநீர் கழிப்பை தவிர்க்க காலையில் உட்கொள்ளவும். பொட்டாசியம் அளவை கண்காணிக்கவும்.",
      sideEffects: "அதிக சிறுநீர் கழிப்பு, குறைந்த பொட்டாசியம், நீரிழப்பு, தசை இழுப்பு."
    }
  },
  // ── STEROIDS / ANTI-INFLAMMATORY ───────────────────────────────────────
  {
    id: 37, name: "Prednisolone 5mg", generic: "Prednisolone", type: "Corticosteroid",
    tags: ["Prescription", "Steroid", "After food"],
    en: {
      purpose: "Treats inflammatory conditions, allergic reactions, autoimmune diseases, and severe asthma.",
      dosage: "As prescribed. Typically 1–6 tablets daily after food. Do not alter dose without doctor's advice.",
      precautions: "Do not stop suddenly after prolonged use — taper gradually. Monitor blood sugar, blood pressure. Avoid contact with chickenpox/shingles.",
      sideEffects: "Weight gain, fluid retention, mood changes, high blood sugar, increased susceptibility to infections, osteoporosis (long-term)."
    },
    ta: {
      purpose: "அழற்சி நிலைமைகள், ஒவ்வாமை எதிர்விளைவுகள், தன்னுடல் தாக்கு நோய்கள் மற்றும் கடுமையான ஆஸ்துமா சிகிச்சை.",
      dosage: "மருத்துவர் பரிந்துரைத்தபடி. பொதுவாக சாப்பிட்ட பிறகு தினமும் 1–6 மாத்திரைகள்.",
      precautions: "நீண்ட கால பயன்பாட்டிற்கு பிறகு திடீரென நிறுத்த வேண்டாம். இரத்த சர்க்கரை, இரத்த அழுத்தம் கண்காணிக்கவும்.",
      sideEffects: "எடை அதிகரிப்பு, திரவ தேக்கம், மனநிலை மாற்றங்கள், அதிக இரத்த சர்க்கரை."
    }
  },
  // ── ANTICOAGULANTS ─────────────────────────────────────────────────────
  {
    id: 38, name: "Aspirin 75mg", generic: "Acetylsalicylic Acid", type: "Antiplatelet / Analgesic",
    tags: ["Heart", "Blood thinner", "Prescription"],
    en: {
      purpose: "Low-dose aspirin prevents blood clots, heart attacks, and strokes in high-risk patients.",
      dosage: "1 tablet (75mg) after food, once daily. Swallow whole with water.",
      precautions: "Always take after food. Avoid if you have stomach ulcers. Inform doctor before any surgery or dental procedure. Avoid in children.",
      sideEffects: "Stomach upset, nausea, increased bleeding risk, rarely stomach bleeding."
    },
    ta: {
      purpose: "குறைந்த அளவு ஆஸ்பிரின் இரத்த உறைவு, மாரடைப்பு மற்றும் பக்கவாதத்தை தடுக்கிறது.",
      dosage: "1 மாத்திரை (75mg) சாப்பிட்ட பிறகு, தினமும் ஒரு முறை.",
      precautions: "எப்போதும் உணவுக்கு பிறகு உட்கொள்ளவும். வயிற்று புண் இருந்தால் தவிர்க்கவும்.",
      sideEffects: "வயிற்று உபாதை, குமட்டல், அதிக இரத்தப்போக்கு அபாயம்."
    }
  },
  // ── ANTIVIRALS ─────────────────────────────────────────────────────────
  {
    id: 39, name: "Acyclovir 400mg", generic: "Acyclovir", type: "Antiviral",
    tags: ["Prescription", "Viral infection"],
    en: {
      purpose: "Treats herpes simplex infections, shingles (herpes zoster), and chickenpox.",
      dosage: "1 tablet (400mg) 3–5 times daily for 5–10 days or as prescribed. Drink plenty of water.",
      precautions: "Stay well hydrated. Adjust dose in kidney impairment. Start as early as possible in the infection for best effect.",
      sideEffects: "Nausea, diarrhoea, headache, dizziness, rash."
    },
    ta: {
      purpose: "ஹெர்பிஸ் சிம்பிளெக்ஸ் நோய்த்தொற்றுகள், ஷிங்கிள்ஸ் மற்றும் சிக்கன்பாக்ஸ் சிகிச்சை.",
      dosage: "1 மாத்திரை (400mg) தினமும் 3–5 முறை, 5–10 நாட்களுக்கு. நிறைய தண்ணீர் குடிக்கவும்.",
      precautions: "சிறுநீரக குறைபாட்டில் அளவை சரிசெய்யவும். நல்ல ஹைட்ரேஷன் பராமரிக்கவும்.",
      sideEffects: "குமட்டல், வயிற்றுப்போக்கு, தலைவலி, தலைசுற்றல்."
    }
  },
  // ── ANTIFUNGALS ────────────────────────────────────────────────────────
  {
    id: 40, name: "Fluconazole 150mg", generic: "Fluconazole", type: "Antifungal",
    tags: ["Prescription", "Fungal infection"],
    en: {
      purpose: "Treats fungal infections including vaginal thrush, oral thrush, and skin fungal infections.",
      dosage: "1 capsule (150mg) as a single dose for vaginal thrush; for other infections as prescribed.",
      precautions: "Inform doctor of liver or kidney problems. Can interact with many medicines — tell doctor all current medications.",
      sideEffects: "Nausea, headache, rash, stomach pain, liver enzyme changes."
    },
    ta: {
      purpose: "யோனி, வாய் மற்றும் தோல் பூஞ்சை நோய்த்தொற்றுகளை சிகிச்சையளிக்கிறது.",
      dosage: "யோனி தொற்றுக்கு 1 கேப்சூல் (150mg) ஒரு முறை; மற்ற நோய்த்தொற்றுகளுக்கு மருத்துவர் கூறியபடி.",
      precautions: "கல்லீரல் அல்லது சிறுநீரக பிரச்சனைகளை தெரிவிக்கவும்.",
      sideEffects: "குமட்டல், தலைவலி, தோல் தடிப்பு, வயிற்று வலி."
    }
  }
];

// ===================== STATE =====================
let currentLang = 'en';
let currentResults = [];
let prescriptionHistory = JSON.parse(localStorage.getItem('rxHistory') || '[]');
let isDark = localStorage.getItem('rxDark') === 'true';
let currentUploadedFile = null; // Tracks the uploaded file for AI analysis

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  if (isDark) document.body.classList.add('dark');
  document.getElementById('darkIcon').textContent = isDark ? '☀️' : '🌙';
  renderHistory();
  showPage('home');
});

// ===================== PAGE ROUTER =====================
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (pg) {
    pg.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // close mobile nav
  document.getElementById('navLinks').classList.remove('open');
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===================== DARK MODE =====================
function toggleDark() {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
  document.getElementById('darkIcon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('rxDark', isDark);
}

// ===================== UPLOAD & OCR =====================
function dragOver(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.add('dragover');
}
function dragLeave(e) {
  document.getElementById('dropZone').classList.remove('dragover');
}
function dropFile(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) loadFile(file);
}
function handleFile(input) {
  if (input.files[0]) loadFile(input.files[0]);
}

function loadFile(file) {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowed.includes(file.type)) {
    showToast('❌ Please upload JPG, PNG, or PDF only.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('❌ File too large. Max 10MB allowed.');
    return;
  }
  currentUploadedFile = file; // Store for AI analysis
  document.getElementById('dropZone').style.display = 'none';
  const previewArea = document.getElementById('previewArea');
  previewArea.style.display = 'flex';
  document.getElementById('fileName').textContent = file.name;
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('previewImg').src = e.target.result;
      document.getElementById('previewImg').style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById('previewImg').style.display = 'none';
  }
}

function removeFile() {
  currentUploadedFile = null;
  document.getElementById('dropZone').style.display = 'flex';
  document.getElementById('previewArea').style.display = 'none';
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';
  const previewImg = document.getElementById('previewImg');
  if (previewImg) { previewImg.src = ''; previewImg.style.display = 'none'; }
}

async function processOCR() {
  if (!currentUploadedFile) {
    showToast('❌ No file selected.');
    return;
  }

  document.getElementById('uploadCard').style.display = 'none';
  const loading = document.getElementById('ocrLoading');
  loading.style.display = 'block';

  const steps = ['step1', 'step2', 'step3', 'step4'];
  const labels = ['📤 Uploading image...', '🔍 Running OCR scan...', '💊 Matching medicines...', '✅ Preparing results...'];

  steps.forEach(s => {
    document.getElementById(s).className = 'ocr-step';
    document.getElementById(s).textContent = labels[steps.indexOf(s)];
  });

  const bar = document.getElementById('progressBar');
  bar.style.width = '0%';

  // Helper: mark step done and advance progress bar
  function markStep(idx) {
    document.getElementById(steps[idx]).className = 'ocr-step done';
    document.getElementById(steps[idx]).textContent = '✓ ' + labels[idx].replace(/^[^\s]+\s/, '');
    if (idx + 1 < steps.length) {
      document.getElementById(steps[idx + 1]).className = 'ocr-step active';
    }
    bar.style.width = ((idx + 1) / steps.length * 100) + '%';
  }

  try {
    // Step 1: Read file as base64
    markStep(0);
    await new Promise(r => setTimeout(r, 400));

    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsDataURL(currentUploadedFile);
    });

    // Step 2: Send to Claude Vision API for OCR
    markStep(1);
    await new Promise(r => setTimeout(r, 300));

    const formData = new FormData();
formData.append('file', currentUploadedFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || 'Upload failed');
}

const data = await response.json();

markStep(2);
await new Promise(r => setTimeout(r, 400));

const matchedMedicines = data.medicines || [];

markStep(3);
await new Promise(r => setTimeout(r, 500));

currentResults = matchedMedicines;
    setTimeout(() => showResults(matchedMedicines), 400);

  } catch (err) {
    console.error('OCR processing error:', err);
    // Reset UI on error
    document.getElementById('uploadCard').style.display = 'block';
    loading.style.display = 'none';
    removeFile();
    showToast('❌ Could not process prescription. Please try again.');
  }
}

// ===================== RESULTS =====================
function showResults(medicines) {
  renderMedicineCards(medicines, 'medicineGrid');
  populateReminderSelect(medicines);
  showPage('results');

  // Update page subtitle with count
  const subtitle = document.querySelector('#page-results .page-header p');
  if (subtitle) {
    if (medicines.length === 0) {
      subtitle.textContent = 'No medicines from our database were found in this prescription.';
    } else {
      subtitle.textContent = `Found ${medicines.length} medicine${medicines.length > 1 ? 's' : ''} in your prescription.`;
    }
  }

  // Reset upload for next time
  document.getElementById('uploadCard').style.display = 'block';
  document.getElementById('ocrLoading').style.display = 'none';
  removeFile();
}

function renderMedicineCards(medicines, containerId) {
  const grid = document.getElementById(containerId);
  if (!medicines.length) {
    if (containerId === 'medicineGrid') {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;padding:3rem 1rem;">
          <div class="empty-icon">🔎</div>
          <h3>No medicines matched</h3>
          <p>The medicines in this prescription were not found in our database.<br/>
          Try searching for them manually on the <strong>Search</strong> page, or upload a clearer image.</p>
          <button class="btn-primary" onclick="showPage('search')" style="margin-top:1rem;">Search Manually</button>
        </div>`;
    } else {
      grid.innerHTML = '';
    }
    return;
  }
  grid.innerHTML = medicines.map((med, i) => {
    const info = med[currentLang] || med.en;
    return `
      <div class="medicine-card" style="animation-delay:${i * 0.1}s">
        <div class="medicine-card-header">
          <div>
            <div class="medicine-name">💊 ${med.name}</div>
            <div class="medicine-type">${med.type}</div>
          </div>
          <button class="medicine-voice-btn" data-text="${(med.name + '. ' + info.purpose).replace(/"/g, '&quot;')}" data-lang="${currentLang}" onclick="speak(this.dataset.text, this.dataset.lang)" title="Listen">🔊</button>
        </div>
        <div class="medicine-card-body">
          <div class="med-info-item">
            <span class="med-info-label">🎯 Purpose / Uses</span>
            <span class="med-info-value">${info.purpose}</span>
          </div>
          <div class="med-info-item">
            <span class="med-info-label">💉 Dosage Instructions</span>
            <span class="med-info-value">${info.dosage}</span>
          </div>
          <div class="med-info-item">
            <span class="med-info-label">⚠️ Precautions</span>
            <span class="med-info-value warning">${info.precautions}</span>
          </div>
          <div class="med-info-item">
            <span class="med-info-label">🔬 Common Side Effects</span>
            <span class="med-info-value side-effects">${info.sideEffects}</span>
          </div>
        </div>
        <div class="med-card-footer">
          ${med.tags.map(t => `<span class="med-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ===================== LANGUAGE TOGGLE =====================
function setLang(lang) {
  currentLang = lang;
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');
  document.getElementById('btnTa').classList.toggle('active', lang === 'ta');
  renderMedicineCards(currentResults, 'medicineGrid');
  // Re-render search results if visible
  const searchQuery = document.getElementById('searchInput').value;
  if (searchQuery.trim()) searchMedicine(searchQuery);
}

// ===================== SEARCH =====================
function searchMedicine(query) {
  const input = document.getElementById('searchInput');
  input.value = query;
  document.getElementById('searchClear').style.display = query ? 'flex' : 'none';

  if (!query.trim()) {
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchEmpty').style.display = 'none';
    return;
  }

  const q = query.toLowerCase();
  const results = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.generic.toLowerCase().includes(q) ||
    m.type.toLowerCase().includes(q) ||
    m.en.purpose.toLowerCase().includes(q)
  );

  if (results.length) {
    document.getElementById('searchEmpty').style.display = 'none';
    renderMedicineCards(results, 'searchResults');
  } else {
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchEmpty').style.display = 'block';
  }
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('searchEmpty').style.display = 'none';
  document.getElementById('searchInput').focus();
}

// ===================== VOICE =====================
function speak(text, lang) {
  if (!window.speechSynthesis) { showToast('❌ Voice not supported in this browser.'); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
  utter.rate = 0.88;
  window.speechSynthesis.speak(utter);
  showToast('🔊 Playing...');
}

// ===================== PDF DOWNLOAD =====================
function downloadPDF() {
  if (!currentResults.length) { showToast('❌ No results to download.'); return; }
  let content = '===== RXSMART PRESCRIPTION REPORT =====\n';
  content += 'Generated: ' + new Date().toLocaleString('en-IN') + '\n\n';
  currentResults.forEach(med => {
    const info = med[currentLang] || med.en;
    content += `MEDICINE: ${med.name}\n`;
    content += `Type: ${med.type}\n`;
    content += `Purpose: ${info.purpose}\n`;
    content += `Dosage: ${info.dosage}\n`;
    content += `Precautions: ${info.precautions}\n`;
    content += `Side Effects: ${info.sideEffects}\n`;
    content += '─'.repeat(40) + '\n\n';
  });
  content += 'DISCLAIMER: This report is for informational purposes only. Always consult your doctor.\n';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'RxSmart_Report_' + Date.now() + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast('✅ Report downloaded!');
}

// ===================== REMINDER =====================
function populateReminderSelect(medicines) {
  const sel = document.getElementById('reminderMed');
  sel.innerHTML = medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

function setReminder() {
  if (!currentResults.length) { showToast('❌ No medicines loaded.'); return; }
  openModal('reminderModal');
}

function saveReminder() {
  const med = document.getElementById('reminderMed').value;
  const time = document.getElementById('reminderTime').value;
  const freq = document.getElementById('reminderFreq').value;
  if (!time) { showToast('⏰ Please select a time.'); return; }
  showToast(`⏰ Reminder set for ${time} — ${freq}`);
  closeModal('reminderModal');
}

// ===================== HISTORY =====================
function savePrescription() {
  if (!currentResults.length) { showToast('❌ Nothing to save.'); return; }
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleString('en-IN'),
    medicines: currentResults.map(m => m.name),
    data: currentResults
  };
  prescriptionHistory.unshift(entry);
  localStorage.setItem('rxHistory', JSON.stringify(prescriptionHistory));
  renderHistory();
  showToast('✅ Prescription saved to history!');
}

function renderHistory() {
  const list = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  if (!prescriptionHistory.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = prescriptionHistory.map(entry => `
    <div class="history-item" onclick="loadHistory(${entry.id})">
      <div class="history-info">
        <div class="history-date">📅 ${entry.date}</div>
        <div class="history-meds">${entry.medicines.slice(0, 2).join(', ')}${entry.medicines.length > 2 ? ' +' + (entry.medicines.length - 2) + ' more' : ''}</div>
        <div class="history-count">${entry.medicines.length} medicine${entry.medicines.length > 1 ? 's' : ''}</div>
      </div>
      <span class="history-arrow">›</span>
    </div>
  `).join('');
}

function loadHistory(id) {
  const entry = prescriptionHistory.find(e => e.id === id);
  if (!entry) return;
  currentResults = entry.data;
  renderMedicineCards(currentResults, 'medicineGrid');
  populateReminderSelect(currentResults);
  showPage('results');
}

// ===================== MODAL =====================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ===================== TOAST =====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

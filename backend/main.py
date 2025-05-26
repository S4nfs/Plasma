# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
from quiz.generator import generate_adaptive_quiz
from utils.logger import logger
from cli.interface import cli_main
import os
import json
#from cryptography.fernet import Fernet

app = FastAPI(title="NEET PG Genius API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''FERNET_KEY = os.getenv("FERNET_KEY", Fernet.generate_key())
fernet = Fernet(FERNET_KEY)'''

# === Data Models ===

class QuizRequest(BaseModel):
    exam: str
    subject: str
    topic: str
    difficulty: Optional[str] = "medium"
    num_questions: Optional[int] = 10
    concept: Optional[str] = None
    user_id: Optional[str] = None

class UserProfile(BaseModel):
    firstName: str
    lastName: str
    phone: str
    email: str
    state: str
    college: str
    batchYear: str
    semester: str
    user_id: str

class PlanSelection(BaseModel):
    title: str
    price: str
    features: list

class SubjectSelection(BaseModel):
    subjectCounts: Dict[str, int]

class FullSession(BaseModel):
    profile: UserProfile
    plan: PlanSelection
    subjectCounts: Dict[str, int]

# === Routes ===

@app.post("/generate-quiz")
def generate_quiz(req: QuizRequest):
    logger.info(f"Generating quiz for user: {req.user_id or 'anonymous'}, Subject: {req.subject}")
    return generate_adaptive_quiz(
        exam=req.exam,
        subject=req.subject,
        topic=req.topic,
        difficulty=req.difficulty,
        num_questions=req.num_questions,
        concept=req.concept,
        user_id=req.user_id
    )

@app.post("/submit-user-profile")
def submit_user_profile(profile: UserProfile):
    try:
        os.makedirs("user_profiles", exist_ok=True)
        data = json.dumps(profile.dict())
        encrypted_data = fernet.encrypt(data.encode())
        with open("user_profiles/profiles.enc", "ab") as f:
            f.write(encrypted_data + b"\n")
        logger.info(f"✅ Profile saved for: {profile.phone}")
        return {"status": "success", "message": "User profile stored"}
    except Exception as e:
        logger.error(f"❌ Failed to save profile: {e}")
        return {"status": "error", "message": str(e)}

@app.post("/initialize-quiz-session")
def initialize_session(session: FullSession):
    try:
        os.makedirs("sessions", exist_ok=True)
        session_data = session.dict()
        encrypted_data = fernet.encrypt(json.dumps(session_data).encode())
        with open(f"sessions/{session.profile.user_id}.session", "wb") as f:
            f.write(encrypted_data)
        logger.info(f"🧾 Session initialized for {session.profile.user_id}")
        return {"status": "success", "message": "Session initialized"}
    except Exception as e:
        logger.error(f"❌ Session init failed: {e}")
        return {"status": "error", "message": str(e)}

# === Dev CLI Entry ===

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "cli":
        cli_main()
    else:
        import uvicorn
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import APIRouter
from models.user import UserProfile
from services.crypto import encrypt_data, hash_user_id
import os
import json

router = APIRouter()

@router.post("/submit-profile")
def submit_user_profile(profile: UserProfile):
    # Hash user ID (used as filename or key)
    user_hash = hash_user_id(profile.user_id)

    # Encrypt entire JSON
    encrypted_json = encrypt_data(profile.json())

    # Store in file (or DB later)
    path = os.path.join("storage", "user_data", f"{user_hash}.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump({"data": encrypted_json}, f)

    return {"status": "success", "message": "Profile securely saved"}

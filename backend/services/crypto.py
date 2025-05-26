from cryptography.fernet import Fernet
import hashlib
import os

# Load key from env or generate one
FERNET_KEY = os.getenv("FERNET_KEY", Fernet.generate_key())
cipher = Fernet(FERNET_KEY)

def encrypt_data(data: str) -> str:
    return cipher.encrypt(data.encode()).decode()

def decrypt_data(token: str) -> str:
    return cipher.decrypt(token.encode()).decode()

def hash_user_id(user_id: str) -> str:
    return hashlib.sha256(user_id.encode()).hexdigest()

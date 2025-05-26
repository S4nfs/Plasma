from pydantic import BaseModel, EmailStr
from typing import Optional

class UserProfile(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    state: str
    college: str
    batch_year: int
    semester: str
    user_id: str  # Clerk User ID

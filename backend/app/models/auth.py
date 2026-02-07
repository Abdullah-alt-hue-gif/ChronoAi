"""
Authentication schemas
"""

from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignupRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

from pydantic import BaseModel

# ---------- AUTH ----------
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    fayda_number: str
    phone_number: str

class UserLogin(BaseModel):
    email: str
    password: str


# ---------- MACHINE ----------
class StartSession(BaseModel):
    machine_id: str
    code: str

class BindSession(BaseModel):
    code: str

class DepositCreate(BaseModel):
    machine_id: str
    code: str
    count: int


class SessionStatusResponse(BaseModel):
    status: str

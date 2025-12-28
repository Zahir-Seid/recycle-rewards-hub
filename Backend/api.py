from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from deps import get_db
from models import User, MachineSession, Deposit
from schemas import UserCreate, UserLogin, BindSession, StartSession, DepositCreate, SessionStatusResponse
from auth import create_token
from deps import get_current_user

router = APIRouter(prefix="/api")

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(
        email=data.email,
        password=data.password,
        full_name=data.full_name,
        fayda_number=data.fayda_number,
        phone_number=data.phone_number
    )
    db.add(user)
    db.commit()
    return {"message": "registered"}

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.password != data.password:
        return {"error": "invalid credentials"}
    return {"access_token": create_token(user.id)}

@router.post("/start-session")
def start_session(data: StartSession, db: Session = Depends(get_db)):
    session = MachineSession(
        machine_id=data.machine_id,
        code=data.code
    )
    db.add(session)
    db.commit()
    return {"message": "session created"}

@router.get("/session-status", response_model=SessionStatusResponse)
def session_status(code: str, db: Session = Depends(get_db)):
    session = db.query(MachineSession).filter_by(code=code).first()
    if not session:
        raise HTTPException(404, "Not found")
    return {"status": session.status}

@router.post("/deposit")
def deposit(data: DepositCreate, db: Session = Depends(get_db)):
    session = db.query(MachineSession).filter_by(code=data.code).first()
    if not session or session.status != "ACTIVE":
        raise HTTPException(400, "Invalid session")

    deposit = Deposit(
        user_id=session.user_id,
        machine_id=data.machine_id,
        count=data.count
    )

    session.status = "USED"
    db.add(deposit)
    db.commit()

    return {"message": "deposit saved"}

@router.post("/bind-session")
def bind_session(
    data: BindSession,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    session = db.query(MachineSession).filter_by(code=data.code).first()
    if not session or session.status != "PENDING":
        raise HTTPException(400, "Invalid code")

    session.user_id = user_id
    session.status = "ACTIVE"
    db.commit()

    return {"message": "session bound"}

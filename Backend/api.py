from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from deps import get_db
from models import User, MachineSession, Deposit
from schemas import UserCreate, UserLogin, BindSession, StartSession, DepositCreate, SessionStatusResponse
from auth import create_token
from deps import get_current_user
from datetime import datetime, timedelta


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
    
    # Check if user exists
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Check if password matches
    if user.password != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"access_token": create_token(user.id)}

@router.post("/start-session")
def start_session(data: StartSession, db: Session = Depends(get_db)):
    # check if an active, non-expired session with this code exists
    existing = db.query(MachineSession).filter(
        MachineSession.code == data.code,
        MachineSession.expires_at > datetime.utcnow()
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Code is already in use")

    expires_at = datetime.utcnow() + timedelta(minutes=10)

    session_obj = MachineSession(
        machine_id=data.machine_id,
        code=data.code,
        expires_at=expires_at
    )
    db.add(session_obj)
    db.commit()
    db.refresh(session_obj)
    return {"message": "session created", "session_id": session_obj.id}

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

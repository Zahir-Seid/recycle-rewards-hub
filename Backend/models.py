from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    fayda_number = Column(String)
    phone_number = Column(String)
    password = Column(String)


class MachineSession(Base):
    __tablename__ = "machine_sessions"

    id = Column(Integer, primary_key=True)
    machine_id = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="PENDING")  # PENDING | ACTIVE | USED
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Deposit(Base):
    __tablename__ = "deposits"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    machine_id = Column(String)
    count = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

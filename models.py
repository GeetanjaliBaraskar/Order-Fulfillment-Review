from sqlalchemy import Column, String, Float, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Order(Base):

    __tablename__ = "orders"

    id = Column(String, primary_key=True)

    customer = Column(String)

    match = Column(String)

    confidence = Column(Float)

    reviewed = Column(Boolean)
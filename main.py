from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, Order

import json

# ---------------- APP ----------------

app = FastAPI()

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- CREATE TABLE ----------------

Base.metadata.create_all(bind=engine)

# ---------------- LOAD JSON ----------------

with open("sample_data.json") as f:
    data = json.load(f)

# ---------------- INSERT DATA INTO DATABASE ----------------

db = SessionLocal()

for item in data:

    existing_order = db.query(Order).filter(
        Order.id == item["id"]
    ).first()

    if not existing_order:

        customer_name = (
            item["order"]["customer"]
            if item["order"]
            else "No Order"
        )

        new_order = Order(
            id=item["id"],
            customer=customer_name,
            match=item["match"],
            confidence=item["confidence"] or 0,
            reviewed=False
        )

        db.add(new_order)
        print("Inserted:", item["id"])
                
                

db.commit()
db.close()

# ---------------- HOME API ----------------

@app.get("/")
def home():
    return {"message": "Backend Running"}

# ---------------- GET ALL ORDERS ----------------

@app.get("/orders")
def get_orders():
    return data

# ---------------- ISSUES API ----------------

@app.get("/issues")
def get_issues():

    issues = []

    for item in data:

        if item["match"] != "full":
            issues.append(item)

    return issues

# ---------------- SINGLE ORDER ----------------

@app.get("/order/{order_id}")
def get_single_order(order_id: str):

    for item in data:

        if item["id"] == order_id:
            return item

    return {"message": "Order not found"}

# ---------------- FILTER API ----------------

@app.get("/match/{match_type}")
def get_match_type(match_type: str):

    result = []

    for item in data:

        if item["match"] == match_type:
            result.append(item)

    return result

# ---------------- REVIEW API ----------------

@app.put("/review/{order_id}")
def review_order(order_id: str):

    for item in data:

        if item["id"] == order_id:

            item["reviewed"] = True

            return {
                "message": "Order reviewed",
                "data": item
            }

    return {"message": "Order not found"}
# Order Fulfillment Review System

## Technologies Used

- React
- FastAPI
- SQLite
- SQLAlchemy



## Project Architecture

sample_data.json
↓
FastAPI Backend
↓
SQLite Database
↓ API
React Frontend
↓
Dashboard UI


## Features

- View all orders
- Search orders
- Filter match types
- Review orders
- Highlight issues
- SQLite integration



## Backend Setup

cd backend

pip install fastapi uvicorn sqlalchemy

uvicorn main:app --reload


## Frontend Setup

cd frontend

npm install

npm start

---

## APIs

- /orders
- /issues
- /match/{type}
- /review/{id}


## Database

SQLite database:
orders.db


## Author

Geetanjali Baraskar
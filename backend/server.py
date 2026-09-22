from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EVENTS = [
    {
        "id": "dash-lakshan-parv",
        "title": "Dash Lakshan Parv",
        "category": "Parv",
        "date": "September 2026",
        "time": "Dates to be announced",
        "location": "Raleigh–RTP Area • Venue to be announced",
        "description": "The sacred festival of the ten supreme virtues — a time of reflection, forgiveness, and spiritual upliftment for the entire Sangh.",
        "tentative": True,
    },
    {
        "id": "kshamavani",
        "title": "Kshamavani",
        "category": "Parv",
        "date": "September 2026",
        "time": "To be announced",
        "location": "Raleigh–RTP Area • Venue to be announced",
        "description": "The day of universal forgiveness — Micchami Dukkadam. Seeking and granting forgiveness to all living beings.",
        "tentative": True,
    },
    {
        "id": "weekly-swadhyay",
        "title": "Weekly Swadhyay",
        "category": "Swadhyay",
        "date": "Every Sunday",
        "time": "10:30 AM – 12:00 PM",
        "location": "Raleigh–RTP Area • Details shared with the Sangh",
        "description": "Collective study of Jain scriptures, philosophy, and the teachings of the Tirthankaras.",
        "tentative": False,
    },
    {
        "id": "kids-pathshala",
        "title": "Kids Pathshala",
        "category": "Pathshala",
        "date": "2nd & 4th Sunday",
        "time": "11:00 AM – 12:30 PM",
        "location": "Raleigh–RTP Area • Details shared with the Sangh",
        "description": "Jain values, stories, and stotras for children — nurturing the next generation in Digambar Jain Dharma.",
        "tentative": False,
    },
    {
        "id": "vidhan-puja",
        "title": "Vidhan Puja",
        "category": "Puja",
        "date": "Monthly",
        "time": "Announced via community channels",
        "location": "Raleigh–RTP Area • Venue to be announced",
        "description": "Devotional vidhan and puja ceremonies conducted in the traditional Digambar Jain manner.",
        "tentative": True,
    },
    {
        "id": "mahavir-jayanti",
        "title": "Mahavir Jayanti",
        "category": "Parv",
        "date": "Spring 2027",
        "time": "To be announced",
        "location": "Raleigh–RTP Area • Venue to be announced",
        "description": "Celebrating the birth of Bhagwan Mahavir, the 24th Tirthankara, with the Sangh.",
        "tentative": True,
    },
    {
        "id": "community-gathering",
        "title": "Sangh Community Gathering",
        "category": "Community",
        "date": "Quarterly",
        "time": "To be announced",
        "location": "Raleigh–RTP Area • Venue to be announced",
        "description": "Bringing the Sangh together — prasad, temple project updates, and community bonding.",
        "tentative": True,
    },
]


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str


class EventRegistration(BaseModel):
    event_id: str
    event_title: str
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    guests: int = 1


class InterestSignup(BaseModel):
    kind: str
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: Optional[str] = ""


@api_router.get("/")
async def root():
    return {"message": "Digambar Jain Center of Raleigh — API"}


@api_router.get("/events")
async def list_events():
    return {"events": EVENTS}


@api_router.post("/contact")
async def create_contact(msg: ContactMessage):
    doc = msg.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.post("/events/register")
async def register_event(reg: EventRegistration):
    doc = reg.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.event_registrations.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.post("/interest")
async def create_interest(signup: InterestSignup):
    doc = signup.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.interest_signups.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

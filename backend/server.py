from fastapi import FastAPI, APIRouter, UploadFile, File, Form, Response, HTTPException
from fastapi import Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Digambar Jain Center of Raleigh")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@djcraleigh.org")

# --- Object storage (Emergent managed) ---
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "djcr"
storage_key = None

IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_UPLOAD_BYTES = 15 * 1024 * 1024


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            data=data, timeout=120,
        )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


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


# --- Email guardrail gate (managed Resend playbook) ---
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not configured; skipping email send")
        return None
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _admin_email_html(title: str, rows) -> str:
    body = "".join(
        f'<tr><td style="padding:8px 12px;font-weight:bold;color:#6F1D1B;vertical-align:top;border-bottom:1px solid #f0e6d2">{escape(k)}</td>'
        f'<td style="padding:8px 12px;color:#292929;border-bottom:1px solid #f0e6d2">{escape(str(v or "")).replace(chr(10), "<br>") or "—"}</td></tr>'
        for k, v in rows
    )
    return (
        f'<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;background:#FFF9ED">'
        f'<h2 style="color:#6F1D1B;margin:0 0 16px">{escape(title)}</h2>'
        f'<table role="presentation" style="border-collapse:collapse;background:#FFFDF7;border:1px solid #e8dcc0">{body}</table>'
        f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by the {escape(EMAIL_FROM_NAME)} website. '
        f'Reply to the sender directly or write to <a href="mailto:admin@djcraleigh.org">admin@djcraleigh.org</a>.</p>'
        f'</td></tr></table>'
    )


async def notify_admin(title: str, rows) -> None:
    try:
        email_id = await send_email(
            to=ADMIN_EMAIL,
            subject=f"DJCR Website: {title}",
            html=_admin_email_html(title, rows),
        )
        logger.info(f"Admin notification sent ({title}): {email_id}")
    except Exception as e:
        logger.error(f"Admin notification email failed ({title}): {e}")


# --- Models ---
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


def _public_file(doc: dict) -> dict:
    return {
        "id": doc["id"],
        "title": doc.get("title") or doc.get("original_filename", ""),
        "category": doc["category"],
        "event_id": doc.get("event_id", ""),
        "content_type": doc.get("content_type", ""),
        "size": doc.get("size", 0),
        "created_at": doc.get("created_at", ""),
        "url": f"/api/media/file/{doc['id']}",
    }


# --- Routes ---
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
    await notify_admin(
        f"New Contact Message — {msg.subject}",
        [("Name", msg.name), ("Email", msg.email), ("Phone", msg.phone),
         ("Subject", msg.subject), ("Message", msg.message)],
    )
    return {"ok": True, "id": doc["id"]}


@api_router.post("/events/register")
async def register_event(reg: EventRegistration):
    doc = reg.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.event_registrations.insert_one(doc)
    await notify_admin(
        f"New Event Registration — {reg.event_title}",
        [("Event", reg.event_title), ("Name", reg.name), ("Email", reg.email),
         ("Phone", reg.phone), ("Guests", reg.guests)],
    )
    return {"ok": True, "id": doc["id"]}


@api_router.post("/interest")
async def create_interest(signup: InterestSignup):
    doc = signup.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.interest_signups.insert_one(doc)
    kind_labels = {
        "join": "Join Our Community",
        "volunteer": "Volunteer",
        "support": "Support the Temple Vision",
        "updates": "Receive Event Updates",
        "whatsapp": "Join WhatsApp Community",
    }
    await notify_admin(
        f"New Community Signup — {kind_labels.get(signup.kind, signup.kind)}",
        [("Interest", kind_labels.get(signup.kind, signup.kind)), ("Name", signup.name),
         ("Email", signup.email), ("Phone", signup.phone), ("Message", signup.message)],
    )
    return {"ok": True, "id": doc["id"]}


# --- Media / file storage routes ---
@api_router.post("/media/upload")
async def upload_media(
    file: UploadFile = File(...),
    category: str = Form("gallery"),
    title: str = Form(""),
    event_id: str = Form(""),
):
    if category not in {"gallery", "event", "document"}:
        raise HTTPException(status_code=400, detail="Invalid category")
    if not EMERGENT_KEY:
        raise HTTPException(status_code=503, detail="Storage is not configured")
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="File too large (max 15 MB)")
    content_type = file.content_type or "application/octet-stream"
    if category == "document":
        if content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are allowed for documents")
    elif content_type not in IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP or GIF images are allowed")
    if category == "event" and event_id and event_id not in {e["id"] for e in EVENTS}:
        raise HTTPException(status_code=400, detail="Unknown event")
    filename = file.filename or "file"
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ("pdf" if category == "document" else "jpg")
    path = f"{APP_NAME}/media/{category}/{uuid.uuid4()}.{ext}"
    try:
        result = await asyncio.to_thread(put_object, path, data, content_type)
    except Exception as e:
        logger.error(f"Storage upload failed: {e}")
        raise HTTPException(status_code=502, detail="Upload storage unavailable")
    doc = {
        "id": str(uuid.uuid4()),
        "storage_path": result["path"],
        "original_filename": filename,
        "title": title.strip(),
        "category": category,
        "event_id": event_id if category == "event" else "",
        "content_type": content_type,
        "size": result.get("size", len(data)),
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.media.insert_one(doc)
    return {"ok": True, "file": _public_file(doc)}


@api_router.get("/media")
async def list_media(category: Optional[str] = None, event_id: Optional[str] = None):
    q = {"is_deleted": False}
    if category:
        q["category"] = category
    if event_id:
        q["event_id"] = event_id
    docs = await db.media.find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"files": [_public_file(d) for d in docs]}


@api_router.get("/media/file/{file_id}")
async def serve_media(file_id: str, download: int = Query(0)):
    record = await db.media.find_one({"id": file_id, "is_deleted": False}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    try:
        data, ct = await asyncio.to_thread(get_object, record["storage_path"])
    except Exception as e:
        logger.error(f"Storage download failed: {e}")
        raise HTTPException(status_code=502, detail="File storage unavailable")
    headers = {}
    if download:
        safe_name = re.sub(r"[^A-Za-z0-9._-]", "_", record.get("original_filename", "file"))
        headers["Content-Disposition"] = f'attachment; filename="{safe_name}"'
    return Response(
        content=data,
        media_type=record.get("content_type") or ct,
        headers=headers,
    )


@api_router.delete("/media/{file_id}")
async def delete_media(file_id: str):
    result = await db.media.update_one({"id": file_id}, {"$set": {"is_deleted": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="File not found")
    return {"ok": True}


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


@app.on_event("startup")
async def startup():
    try:
        if EMERGENT_KEY:
            await asyncio.to_thread(init_storage)
            logger.info("Object storage initialized")
        else:
            logger.warning("EMERGENT_LLM_KEY not set — object storage disabled")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

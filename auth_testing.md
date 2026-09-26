# Auth Testing Playbook (DJCR Admin)

## Credentials (also in /app/memory/test_credentials.md)
- Admin email: admin@djcraleigh.org
- Admin password: value of ADMIN_PASSWORD in /app/backend/.env
- Role: admin

## Step 1: MongoDB Verification
```
mongosh
use <database_name>
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`; unique index exists on users.email; index on login_attempts.identifier.

## Step 2: API Testing
```
curl -X POST $API/api/admin/login -H "Content-Type: application/json" -d '{"email":"admin@djcraleigh.org","password":"<ADMIN_PASSWORD>"}'
```
Should return `{"token": "...", "email": "admin@djcraleigh.org"}`.

```
TOKEN=<token from login>
curl $API/api/admin/events -H "Authorization: Bearer $TOKEN"
curl -X POST $API/api/admin/events -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Test Event","category":"Community","date":"Today","description":"test"}'
curl -X PUT $API/api/admin/events/<id> -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Test Event","category":"Community","date":"Tomorrow","description":"edited"}'
curl -X DELETE $API/api/admin/events/<id> -H "Authorization: Bearer $TOKEN"
```
All admin endpoints must return 401 without the Bearer token. Public GET /api/events must list seeded + created events.

## Step 3: Brute Force
5 wrong-password logins within 15 min → 429 "Too many failed attempts".

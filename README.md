# URL Shortener – Full Stack Application

This repository contains a **full‑stack URL Shortener application** with a **React.js frontend** and a **NestJS backend**, combined in a single monorepo. The application allows users to register, authenticate, create short URLs, track clicks, and manage URLs via a dashboard.

---

## Repository Structure

```
url-shortener/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           #Express
│   ├── src/
│   ├── prisma/
│   ├── prisma.config.ts
│   ├── package.json
│   ├── docker-compose.yml
│   ├── .gitignore
|   ├── .env.example
│   └── tsconfig.json
└── README.md           # This file
```

---

## 1. Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** / **pnpm** / **yarn**
- **docker**
- Running backend API (Express)

### Installation

```bash
git clone https://github.com/nooralamkhansujon/url-shortener.git
```

### Backend Setup (Express)

```bash
cd backend
npm install
docker compose up -d
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

JWT_SECRET=asdfalkasiuekdka@34348313$%%%%!!!@asdsadf
JWT_EXPIRES_IN=1d

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/url_shortener"
REDIS_HOST="localhost"
REDIS_PORT=6379
```

Run database migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:3000
```

---

### Frontend Setup (React + TypeScript)

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 2. Frontend Overview

### Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Axios

### Key Features

- User registration & login
- Protected routes
- Dashboard with URL list
- Modal‑based URL creation
- Click count display
- Delete URL action

---

## 3. Backend Overview

### Tech Stack

- Express Js
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Core Features

- User authentication (JWT)
- URL shortening logic
- Redirect handling with click tracking
- Secure user‑scoped URL management

---

## 4. API Documentation

### Authentication

#### Register

`POST /api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YmEwYzM4Ni02YWRmLTRiNGYtYjQ5MC03YTYwMDM0ZDYwOWEiLCJlbWFpbCI6Im5vb3JhbGFtM0BtYWlsLmNvbSIsImlhdCI6MTc2ODA0NjAxMSwiZXhwIjoxNzY4MTMyNDExfQ.NRZpp8wl2ZM-8Q_BlAnEi0WIsPy5d1569CEbESeSLw8",
  "user": {
    "id": "4ba0c386-6adf-4b4f-b490-7a60034d609a",
    "email": "nooralam3@mail.com"
  }
}
```

#### Login

`POST /api/auth/login`

```json
{
  "message": "Login Successfull",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmU4NWVlOS0wMTM3LTQyNjMtOTgzOC1hMzkwNzIwZGM0NDUiLCJlbWFpbCI6Im5vb3JhbGFtQG1haWwuY29tIiwiaWF0IjoxNzY4MDQ1OTUxLCJleHAiOjE3NjgxMzIzNTF9.AcvNR22ug0JcYn7475JO4qrR50MXhgwlXP24MJEk8TM",
  "user": {
    "id": "bbe85ee9-0137-4263-9838-a390720dc445",
    "email": "nooralam@mail.com"
  }
}
```

#### Current User

`GET /api/auth/user`

Header:

```
Authorization: Bearer <token>
```

```json
{
  "user": {
    "id": "bbe85ee9-0137-4263-9838-a390720dc445",
    "email": "nooralam@mail.com",
    "createdAt": "2026-01-06T16:18:30.381Z"
  }
}
```

---

### URLs

#### Create URL

`POST /urls`

```json
{
  "originalUrl": "https://example.com"
}
```

```json
{
  "message": "Short URL created",
  "data": {
    "id": "9369cfb5-f519-41a5-9c64-b87b54be6f43",
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "Rjrx3w",
    "shortUrl": "http://localhost:3000/Rjrx3w",
    "clickCount": 0,
    "createdAt": "2026-01-10T11:55:09.615Z"
  }
}
```

---

#### List URLs

`GET /urls`

```json
{
  "message": "success",
  "urls": [
    {
      "id": "83bbc367-1b42-4d8f-9cb3-98c0b4ec8472",
      "originalUrl": "https://example.com/very/long/url",
      "shortCode": "PMbkb2",
      "clickCount": 4,
      "createdAt": "2026-01-08T03:56:29.953Z",
      "userId": "bbe85ee9-0137-4263-9838-a390720dc445"
    }
  ]
}
```

---

#### Delete URL

`DELETE /urls/:id`

```json
{
  "message": "short url deleted successfully"
}
```

---

### Redirect

`GET /:shortCode`

- Redirects to original URL
- Increments click count

---

## 5. Design Decisions

- **Monorepo structure** for easy coordination between frontend and backend
- **Express Js** for scalable backend architecture
- **React + Vite** for fast frontend development
- **JWT authentication** for stateless security
- **React Query** for automatic data syncing
- **Modal‑based UX** to keep dashboard clean

---

## 6. Known Limitations

- No refresh token implementation
- No rate limiting
- No custom short codes
- Analytics limited to total clicks

---

## 7. Future Improvements

- Refresh token & session rotation
- URL expiration & custom aliases
- Advanced analytics (geo, device)
- Pagination & search
- Admin dashboard
- Dockerize Both Backend and Frontend & CI/CD setup

---

## License

MIT License

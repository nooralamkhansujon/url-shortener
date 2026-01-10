# URL Shortener Backend (NestJS)

This repository contains the backend service for the **URL Shortener Application**, built using **NestJS**, **PostgreSQL**, and **Prisma ORM**. It provides authentication, URL shortening, redirection, and analytics APIs consumed by the frontend dashboard.

---

## 1. Setup Instructions

### Prerequisites

* Node.js >= 18
* PostgreSQL >= 14
* npm or yarn

### Installation

```bash
git clone <backend-repo-url>
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/url_shortener"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1d"
PORT=4000
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Run the Server

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

The API will be available at:

```
http://localhost:4000
```

---

## 2. Project Structure

```
src/
├── auth/              # Authentication module (JWT)
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── users/             # User management
├── urls/              # URL shortening logic
│   ├── urls.controller.ts
│   ├── urls.service.ts
│   └── dto/
├── prisma/            # Prisma service & schema
│   ├── prisma.service.ts
│   └── schema.prisma
├── common/            # Guards, decorators, filters
├── app.module.ts
└── main.ts
```

---

## 3. API Documentation

### Authentication

#### Register

`POST /auth/register`

**Request**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**

```json
{
  "id": 1,
  "email": "user@example.com"
}
```

---

#### Login

`POST /auth/login`

**Request**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**

```json
{
  "access_token": "jwt-token-here"
}
```

---

#### Get Current User

`GET /auth/me`

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
  "id": 1,
  "email": "user@example.com"
}
```

---

### URL Management

#### Create Short URL

`POST /urls`

**Headers**

```
Authorization: Bearer <token>
```

**Request**

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response**

```json
{
  "id": 1,
  "shortCode": "aB3xY",
  "shortUrl": "http://localhost:4000/aB3xY"
}
```

---

#### List User URLs

`GET /urls`

**Response**

```json
[
  {
    "id": 1,
    "originalUrl": "https://example.com",
    "shortCode": "aB3xY",
    "clicks": 10,
    "createdAt": "2026-01-01T10:00:00Z"
  }
]
```

---

#### Delete URL

`DELETE /urls/:id`

**Response**

```json
{
  "message": "URL deleted successfully"
}
```

---

### Redirection

#### Redirect to Original URL

`GET /:shortCode`

* Increments click count
* Redirects to original URL

---

## 4. Design Decisions

* **NestJS**: Modular, scalable architecture
* **Prisma ORM**: Type-safe database access
* **PostgreSQL**: Reliable relational database
* **JWT Authentication**: Stateless and secure
* **DTO Validation**: Prevents invalid payloads

---

## 5. Known Limitations

* No refresh token implementation
* No custom short code support
* No rate limiting
* Analytics limited to click count only

---

## Future Improvements

* Refresh token & session rotation
* Rate limiting & abuse prevention
* URL expiration & custom aliases
* Advanced analytics (location, device)
* Admin dashboard support

---

## License

MIT License

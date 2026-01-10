# URL Shortener – Frontend

A modern **URL Shortener frontend** built with **React 18, TypeScript, Vite, Tailwind CSS, React Query, and Zustand**.
The application supports authentication, protected routes, URL creation via modal, URL listing with analytics, and persistent login.

---

## 1. Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** / **pnpm** / **yarn**
- Running backend API (Express)

### Installation

```bash
git clone https://github.com/nooralamkhansujon/url-shortener.git
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3000/api
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 2. Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components (Modal, UrlTable, Forms)
│   ├── hooks/             # React Query hooks (useUrls, useMe)
│   ├── pages/             # Page-level components (Login, Register, Dashboard)
│   ├── routes/            # Routing & protected routes
│   ├── services/          # Axios API setup
│   ├── store/             # Zustand auth store
│   ├── styles/            # Global styles
│   ├── App.tsx            # App bootstrap + hydration
│   └── main.tsx           # Entry point
├── public/
├── .env
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 3. API Documentation

### Authentication

#### Register

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

---

#### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

---

#### Get Current User

**GET** `/api/auth/me`

Headers:

```
Authorization: Bearer <token>
```

**Response**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### URL Management

#### Create Short URL

**POST** `/api/urls`

```json
{
  "originalUrl": "https://example.com"
}
```

**Response**

```json
{
  "id": 1,
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 0,
  "createdAt": "2025-01-08T10:20:00Z"
}
```

---

#### List User URLs

**GET** `/api/urls`

**Response**

```json
[
  {
    "id": 1,
    "originalUrl": "https://example.com",
    "shortCode": "abc123",
    "clicks": 10,
    "createdAt": "2025-01-08T10:20:00Z"
  }
]
```

---

#### Delete URL

**DELETE** `/api/urls/:id`

**Response**

```json
{
  "message": "URL deleted successfully"
}
```

---

## 4. Design Decisions

- **Vite + React 18**: Fast dev server and modern bundling
- **TypeScript**: Type safety and maintainability
- **Tailwind CSS**: Rapid UI development with consistent styling
- **React Query**: Server-state management, caching, and auto re-fetching
- **Zustand**: Lightweight global auth state
- **JWT Authentication**: Simple and scalable auth strategy
- **Modal-based URL creation**: Keeps dashboard clean and focused
- **Table-based URL list**: Familiar SaaS-style data presentation

---

## 5. Known Limitations

- No pagination or infinite scrolling (all URLs loaded at once)
- No refresh-token mechanism (JWT expiration requires re-login)
- No role-based access control
- Click analytics limited to total count only
- No custom domain support for short URLs

---

## Future Improvements

- Pagination & search
- Detailed click analytics
- QR code generation
- Custom short codes
- Refresh token support
- Public redirect page

---

**Author:** Your Name
**Project:** URL Shortener Frontend

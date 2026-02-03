# Notes API

A minimal backend REST API for managing notes with intelligent features including validation, smart updates, and search capabilities.

## Features

- **CRUD Operations** - Create, Read, Update, Delete notes
- **Smart Search** - Case-insensitive partial matching in title and content
- **Intelligent Updates** - Detects when no changes are made
- **Input Validation** - Trims whitespace, rejects empty strings
- **Rate Limiting** - Max 5 note creations per minute
- **Error Handling** - Mongoose validation and proper HTTP status codes

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- express-async-handler
- express-rate-limit

## Getting Started

### Prerequisites

- Node.js
- MongoDB connection string

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
CONNECTION_STRING=mongodb://your-connection-string
NODE_ENV=development
```

### Run the Server

```bash
node app.js
```

## API Endpoints

Base URL: `/api/v1/notes`

### Create a Note

```http
POST /api/v1/notes
Content-Type: application/json

{
  "title": "Meeting Notes",
  "content": "Discussed hiring plan and deadlines"
}
```

**Response:** `201 Created`

### Get All Notes

```http
GET /api/v1/notes
```

Returns notes sorted by most recently updated first.

### Update a Note

```http
PUT /api/v1/notes/:id
Content-Type: application/json

{
  "title": "Updated Title"
}
```

- Partial updates allowed (title only, content only, or both)
- Returns "No changes detected" if values are unchanged

### Delete a Note

```http
DELETE /api/v1/notes/:id
```

### Search Notes

```http
GET /api/v1/notes/search?q=meeting
```

- Searches in both title and content
- Case-insensitive
- Partial matching

## Validation Rules

| Field | Rules |
|-------|-------|
| `title` | Required, min 3 characters, trimmed |
| `content` | Required, min 3 characters, trimmed |

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `POST /notes` | 5 requests per minute |

## Project Structure

```
Notes API/
├── app.js                 # Entry point
├── config/
│   └── dbConnection.js    # MongoDB connection
├── controllers/
│   └── notesController.js # Route handlers
├── middleware/
│   ├── errorHandlerMiddleware.js
│   └── rateLimitMiddleware.js
├── Models/
│   └── NotesModel.js      # Mongoose schema
├── routes/
│   └── notesRoutes.js     # API routes
└── .env                   # Environment variables
```

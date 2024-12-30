# Event Management API

A robust RESTful API built with Node.js, Express, and TypeScript for managing events. Features include user authentication, event management with image uploads, and an event registration system.

## Tech Stack

- **Runtime**: Node.js (v22.10.2)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Logging**: Pino with pino-pretty
- **Development**: ts-node-dev
- **Package Manager**: pnpm

## Key Features

- 🔐 JWT-based Authentication
- 📝 CRUD Operations for Events
- 🖼️ Image Upload Support
- 📅 Event Registration System
- 🔍 Input Validation
- 📝 Detailed Logging
- 🗄️ SQLite Database

## Getting Started

### Prerequisites

- Node.js >= (v22.10.2)
- TypeScript
- pnpm (Install with: `npm install -g pnpm`)
- SQLite

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Copy environment file:
   ```
   cp .env.example .env
   ```
4. Start development server:
   ```
   pnpm dev
   ```

### Environment Configuration

Create a `.env` file in the root directory:

```
PORT=3020
NODE_ENV=development
CORS_ORIGIN=http://localhost:3020
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

## API Documentation

### Authentication Endpoints

#### Register New User

POST /users/signup

- Content-Type: application/json
- Body:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- Response (201):
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "abc123",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
  ```

#### User Login

POST /users/login

- Content-Type: application/json
- Body:
  ```json
  {
    "username": "Peter Perez",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- Response (200):
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "abc123",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
  ```

### Event Endpoints

#### Create Event

POST /events

- Authorization: Bearer token
- Content-Type: multipart/form-data
- Form Data:
  - title: "Tech Conference"
  - description: "Annual technology conference"
  - address: "123 Tech St"
  - date: "2024-12-31T00:00:00.000Z"
  - image: (file)
- Response (201):
  ```json
  {
    "message": "Event created successfully"
  }
  ```

#### Update Event

PUT /events/:id

- Authorization: Bearer token
- Content-Type: multipart/form-data
- Form Data:
  - title: "Updated Tech Conference"
  - description: "Updated description"
  - address: "456 Tech Ave"
  - date: "2024-12-31T00:00:00.000Z"
  - image: (file)
- Response (200):
  ```json
  {
    "message": "Event updated successfully"
  }
  ```

#### Delete Event

DELETE /events/:id

- Authorization: Bearer token
- Response (200):
  ```json
  {
    "message": "Event deleted successfully"
  }
  ```

#### Get All Events

GET /events

- Response (200):
  ```json
  [
    {
      "id": "event123",
      "title": "Tech Conference",
      "description": "Annual technology conference",
      "address": "123 Tech St",
      "date": "2024-12-31T00:00:00.000Z",
      "image": "/images/event-image.jpg",
      "user_id": "user123"
    }
  ]
  ```

#### Get Single Event

GET /events/:id

- Response (200):
  ```json
  {
    "id": "event123",
    "title": "Tech Conference",
    "description": "Annual technology conference",
    "address": "123 Tech St",
    "date": "2024-12-31T00:00:00.000Z",
    "image": "/images/event-image.jpg",
    "user_id": "user123"
  }
  ```

### Event Registration Endpoints

#### Register for Event

POST /events/:id/register

- Authorization: Bearer token
- Response (200):
  ```json
  {
    "message": "Registered for event successfully"
  }
  ```

#### Unregister from Event

DELETE /events/:id/unregister

- Authorization: Bearer token
- Response (200):
  ```json
  {
    "message": "Unregistered from event successfully"
  }
  ```

## Validation Rules

### User Data Validation

- **Username**
  - Length: 3-20 characters
  - Pattern: Alphanumeric and underscores only
  - Must be unique
- **Password**
  - Minimum length: 6 characters
  - Must contain: Uppercase, lowercase, and number
- **Email**
  - Must be valid email format
  - Must be unique

### Event Data Validation

- **Title**
  - Minimum length: 3 characters
- **Description**
  - Minimum length: 10 characters
- **Address**
  - Minimum length: 5 characters
- **Date**
  - Must be valid ISO date string
- **Image**
  - Types: JPEG, PNG, GIF, WebP
  - Maximum size: 5MB

## Error Handling

All errors follow this format:

```json
{
  "error": "Descriptive error message"
}
```

Status Codes:

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── database/       # Database configuration
│   └── logger/         # Logger configuration
├── controllers/         # Request handlers
│   ├── events/
│   ├── login/
│   └── signup/
├── middleware/          # Express middleware
├── models/             # Database models
│   ├── events/
│   └── users/
├── routes/             # API routes
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## Development Commands

- Start development server:
  ```
  pnpm dev
  ```
- Build for production:
  ```
  pnpm build
  ```
- Start production server:
  ```
  pnpm start
  ```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS configuration
- File upload restrictions
- SQL injection prevention (using prepared statements)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

ISC License - see the [LICENSE](LICENSE) file for details

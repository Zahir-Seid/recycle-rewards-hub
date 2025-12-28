# EcoRecycle - Reverse Vending Machine Network

A comprehensive web platform that connects users with Reverse Vending Machines (RVMs) across the city, enabling seamless recycling of bottles and cans while earning rewards points. Users can track their environmental impact, redeem points for eco-friendly initiatives, or cash out directly.

## 🌟 Features

### User Features
- **User Registration & Authentication**: Secure registration with full name, Fayda number, phone number, and email
- **RVM Session Management**: Start, bind, and track recycling sessions with Reverse Vending Machines
- **Real-time Deposits**: Deposit bottles and cans through connected RVMs and earn points instantly
- **Rewards System**: Redeem points for eco-friendly initiatives like:
  - Plant a Tree
  - Beach Cleanup
  - Community Garden Support
  - Waste Collection Drives
  - Solar Panel Initiatives
  - Wind Energy Support
  - Cash Out (convert points to money)
- **Deposit History**: View your recycling history and track your environmental contribution
- **Points Tracking**: Monitor your points balance and earnings

### Technical Features
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **JWT Authentication**: Secure token-based authentication
- **SQLite Database**: Lightweight database for user data, sessions, and deposits
- **Responsive Design**: Modern, mobile-first UI built with React and Tailwind CSS
- **Docker Support**: Containerized deployment for both frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **React Query** - Data fetching and caching

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **python-jose** - JWT token handling
- **python-dotenv** - Environment variable management
- **Uvicorn** - ASGI server
- **SQLite** - Database (can be easily migrated to PostgreSQL/MySQL)

## 📁 Project Structure

```
recycle-rewards-hub/
├── Backend/
│   ├── api.py              # API routes and endpoints
│   ├── auth.py             # JWT token creation
│   ├── database.py         # Database configuration
│   ├── deps.py             # Dependencies (DB session, auth)
│   ├── main.py             # FastAPI application entry point
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── rvm.db              # SQLite database file
│
├── Frontend/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   │   ├── Index.tsx   # Landing page
│   │   │   ├── AuthPage.tsx # Login/Register
│   │   │   ├── Dashboard.tsx # Main dashboard
│   │   │   └── RewardsPage.tsx # Rewards redemption
│   │   ├── components/      # Reusable components
│   │   ├── lib/
│   │   │   └── api.ts      # API client
│   │   └── App.tsx         # Main app component
│   ├── public/              # Static assets
│   ├── package.json        # Node dependencies
│   └── Dockerfile          # Frontend Docker configuration
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.11+** (for backend)
- **Node.js 20+** and npm (for frontend)
- **Docker** (optional, for containerized deployment)

### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the Backend directory:
   ```env
   DATABASE_URL=sqlite:///./rvm.db
   ```

5. **Run the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env` file in the Frontend directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or port 8080 as configured)

5. **Build for production**
   ```bash
   npm run build
   ```

## 🐳 Docker Deployment

### Backend Docker

1. **Build the image**
   ```bash
   cd Backend
   docker build -t recycle-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 8000:8000 -e DATABASE_URL=sqlite:///./rvm.db recycle-backend
   ```

### Frontend Docker

1. **Build the image**
   ```bash
   cd Frontend
   docker build -t recycle-frontend .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 recycle-frontend
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
  - Body: `{ email, password, full_name, fayda_number, phone_number }`
- `POST /api/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ access_token }`

### Session Management
- `POST /api/start-session` - Start a new RVM session
  - Body: `{ machine_id, code }`
- `POST /api/bind-session` - Bind session to user (requires auth)
  - Body: `{ code }`
  - Headers: `Authorization: Bearer <token>`
- `GET /api/session-status?code=<code>` - Get session status
  - Returns: `{ status }`

### Deposits
- `POST /api/deposit` - Record a deposit
  - Body: `{ machine_id, code, count }`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

Tokens expire after 6 hours.

## 🎨 Frontend Routes

- `/` - Landing page with RVM information
- `/auth` - Login and Registration page
- `/dashboard` - User dashboard with session management
- `/rewards` - Rewards redemption page

## 🔧 Environment Variables

### Backend
- `DATABASE_URL` - Database connection string (default: `sqlite:///./rvm.db`)

### Frontend
- `VITE_API_URL` - Backend API URL (default: `http://localhost:8000`)

## 📝 Database Schema

### Users
- `id` (Primary Key)
- `email` (Unique)
- `password`
- `full_name`
- `fayda_number`
- `phone_number`

### Machine Sessions
- `id` (Primary Key)
- `machine_id`
- `code` (Unique)
- `user_id` (Foreign Key, nullable)
- `status` (PENDING | ACTIVE | USED)
- `created_at`

### Deposits
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `machine_id`
- `count`
- `created_at`

## 🚧 Future Enhancements

- [ ] User profile management
- [ ] Points history and analytics
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Machine location map
- [ ] QR code scanning functionality
- [ ] Social sharing features
- [ ] Multi-language support




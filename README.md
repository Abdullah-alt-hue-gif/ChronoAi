# ChronoAI

**Intelligent AI-powered event scheduling system that reasons about complex constraints and generates conflict-free schedules.**

> Schedule any event intelligently with explainable AI reasoning and conflict detection.

---

## Overview

ChronoAI is a full-stack web application designed to solve complex scheduling problems across multiple event types. Unlike traditional scheduling tools, ChronoAI leverages constraint-based AI algorithms to detect conflicts, optimize time allocation, and provide transparent reasoning for every scheduling decision.

## Key Features

- **Intelligent Constraint-Based Scheduling**: Analyzes and validates hard constraints (must-haves) and soft constraints (preferences) to generate optimal schedules
- **Multiple Event Types Support**: Tournament, Conference, Hackathon, Workshop, and Custom event configurations
- **Explainable AI Decisions**: Transparent reasoning for every scheduling choice with detailed explanations
- **Conflict Detection System**: Identifies hard conflicts (violations) and soft conflicts (suboptimal choices) with visual indicators
- **Event-Type Specific Logic**: Tailored constraint sets and scheduling rules for different event categories
- **Professional User Interface**: Clean, responsive design with real-time schedule visualization
- **RESTful API**: Comprehensive backend API for complete event management

## Technology Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router and TypeScript
- **React 19** - UI component library
- **TypeScript** - Type-safe application development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Zustand** - Lightweight state management
- **date-fns** - Date formatting and manipulation
- **Playwright** - Automated E2E testing

### Backend
- **Python 3.10+** - Core language
- **FastAPI** - High-performance REST API framework
- **SQLAlchemy** - Object-relational mapping and database management
- **SQLite** - Lightweight database engine
- **Pydantic** - Data validation and serialization
- **python-jose** - JWT authentication
- **passlib** - Password hashing and verification

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Python 3.10 or higher
- pip (Python package manager)

### Backend Setup

```bash
cd backend

# Create Python virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python -m uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Quick Start

### 1. User Authentication
- Sign up at `/signup` or login at `/login` with test credentials
- JWT authentication tokens stored securely in browser

### 2. Create a New Event
- Choose event type from available options
- Enter event name, start date, and end date
- Configure event-specific parameters

### 3. Configure Event Details
- Add entities (teams, speakers, venues, rooms, etc.)
- Define sessions, matches, or talks with durations
- Set constraints and preferences

### 4. Generate Schedule
- Click "Generate Schedule" to run the AI algorithm
- System analyzes constraints and generates optimal schedule
- View complete reasoning for each placement

### 5. Review and Export
- View calendar timeline of generated schedule
- Identify and resolve any conflicts
- Review AI explanations for recommendations

## API Endpoints

### Authentication
```
POST   /api/auth/signup              Register new user
POST   /api/auth/login               User login and JWT token generation
```

### Events Management
```
POST   /api/v1/events                Create new event
GET    /api/v1/events                List user's events
GET    /api/v1/events/{id}           Get event details
PATCH  /api/v1/events/{id}           Update event
DELETE /api/v1/events/{id}           Delete event

POST   /api/v1/events/{id}/entities                Add entities to event
GET    /api/v1/events/{id}/entities               List event entities
PATCH  /api/v1/events/entities/{id}               Update entity

POST   /api/v1/events/{id}/sessions                Add sessions/matches
GET    /api/v1/events/{id}/sessions               List event sessions
PATCH  /api/v1/events/sessions/{id}               Update session
DELETE /api/v1/events/sessions/{id}               Delete session

POST   /api/v1/events/{id}/generate-schedule      Generate schedule
GET    /api/v1/events/{id}/schedule               Get generated schedule
```

## Supported Event Types

### Tournament
- Competitive events with teams and venues
- Constraints: Team availability, venue capacity, match duration, rest periods
- Optimization: Balanced team loads, optimal venue utilization

### Conference
- Multi-talk events with speaker presentations
- Constraints: Speaker availability, room capacity, equipment requirements
- Optimization: Prime time allocation for high-priority talks

### Hackathon
- Time-intensive events with mandatory phases
- Constraints: Phase sequencing, activity duration, participant availability
- Optimization: Mentor load balancing, break distribution

### Workshop
- Training events with instructors and participants
- Constraints: Instructor availability, seat limits, skill prerequisites
- Optimization: Participant experience, even trainer loads

### Custom
- User-defined event configuration with flexible constraints
- Fully customizable entities, sessions, and constraint rules

## Scheduling Algorithm

The core scheduling engine operates through a multi-stage process:

1. **Time Block Generation** - Divides event duration into 30-minute intervals
2. **Constraint Validation** - Verifies hard constraints (unviolable requirements)
3. **Slot Scoring** - Evaluates soft constraints (preferences) for each time slot
4. **Greedy Assignment** - Assigns sessions to highest-scoring available slots
5. **Conflict Detection** - Identifies and categorizes all scheduling conflicts
6. **Explanation Generation** - Documents reasoning for every scheduling decision

## Project Structure

```
chronoai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI application entry point
│   │   ├── models/
│   │   │   ├── database.py           # SQLAlchemy ORM models
│   │   │   ├── schemas.py            # Pydantic request/response schemas
│   │   │   └── auth.py               # Authentication schemas
│   │   ├── routes/
│   │   │   ├── auth.py               # Authentication endpoints
│   │   │   └── events.py             # Event management endpoints
│   │   ├── engine/
│   │   │   ├── scheduler_core.py     # Core scheduling algorithm
│   │   │   ├── constraint_engine.py  # Constraint validation logic
│   │   │   └── explainer.py          # Decision explanation generator
│   │   └── utils/
│   │       └── auth.py               # Authentication utilities
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── login/                   # Login page
│   │   ├── signup/                  # Signup page
│   │   ├── dashboard/               # User dashboard
│   │   └── [other pages]/
│   ├── components/
│   │   ├── AuthProvider.tsx         # Auth context provider
│   │   ├── EventForm.tsx            # Event creation form
│   │   ├── EventTypeSelector.tsx    # Event type selection
│   │   ├── ScheduleView.tsx         # Schedule visualization
│   │   ├── ConflictPanel.tsx        # Conflict display
│   │   ├── ExplainabilityPanel.tsx  # Reasoning explanations
│   │   └── forms/                   # Event-type specific forms
│   ├── lib/
│   │   ├── api.ts                   # API client
│   │   ├── store.ts                 # Zustand state management
│   │   └── mockData.ts              # Sample data
│   ├── public/                      # Static assets
│   └── README.md
├── tests_automation/
│   ├── api/
│   └── e2e/
└── README.md
```

## Design System

### Color Palette
- **Primary** (#2563EB) - Electric blue for main actions
- **Success** (#10B981) - Emerald for positive states
- **Warning** (#F59E0B) - Amber for cautions
- **Error** (#EF4444) - Crimson for errors
- **Background** (#0F172A) - Midnight blue for main background
- **Surface** (#F8FAFC) - Off-white for cards

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Border Radius**: 14px default

## Development

### Installing Dependencies

```bash
# Frontend
cd frontend
npm install --legacy-peer-deps

# Backend
cd backend
pip install -r requirements.txt
```

### Running Tests

```bash
# E2E Tests
cd frontend
npm run test:e2e

# API Integration Tests
cd tests_automation
python -m pytest api/
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Architecture

The application follows a clean architecture pattern:

- **Frontend**: Next.js App Router with React components, Zustand for state
- **Backend**: Layered architecture with routes, models, engine, and utilities
- **Database**: SQLite with SQLAlchemy ORM for data persistence
- **Authentication**: JWT-based authentication with PBKDF2-SHA256 password hashing

## Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Considerations

- Frontend: Optimized with Next.js image optimization and code splitting
- Backend: Efficient SQLAlchemy queries with relationship loading
- Scheduling Engine: O(n²) complexity in typical use cases with optimization opportunities
- Database: SQLite suitable for development; upgrade to PostgreSQL for production

## Known Limitations

- Single-user scheduling (no concurrent editing)
- Limited historical schedule tracking
- No recurring event support
- Basic conflict resolution without user preference learning

## Future Enhancements

- Multi-user collaboration features
- Schedule optimization with ML models
- Integration with calendar systems (Google Calendar, Outlook)
- Real-time WebSocket updates
- Advanced analytics and reporting
- Mobile application

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 8000
- Check CORS configuration in `app/main.py`
- Verify firewall settings

### Frontend Development Issues
- Clear `.next` folder and node_modules cache
- Ensure Node.js version is 18+
- Check that `NEXT_PUBLIC_API_URL` is properly configured

### Database Issues
- Delete `chronoai.db` to reset database
- Check that `app/models/database.py` initialization runs on startup
- Verify SQLite file permissions

## License

This project is provided as-is for educational and hackathon purposes.

## Support

For issues, feature requests, or questions, please open an issue on the repository.

---

**Built with modern web technologies and AI-powered scheduling algorithms**

*Schedule any event intelligently — no conflicts, no chaos.*

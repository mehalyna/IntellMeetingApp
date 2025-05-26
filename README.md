# IntellMeetingApp

IntellMeetingApp is a Next.js application with a Flask backend that helps users plan, manage, and analyze meetings with intelligent suggestions and detailed analytics. It provides tools for agenda creation, participant management, and post-meeting insights.

## Features

- **Meeting Setup & Management**
  - Create meetings with title, date, and time
  - Add and manage agenda items with time allocations
  - Invite and manage participants with different roles

- **Meeting Analytics**
  - Agenda coverage tracking and visualization
  - Speaking participation analysis
  - Meeting cost estimation
  - AI-powered improvement suggestions

- **Interactive UI Components**
  - Responsive design with Tailwind CSS
  - Dynamic charts and visualizations
  - Status indicators for agenda coverage
  - Participant role management

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework with server-side rendering
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend
- [Flask](https://flask.palletsprojects.com/) - Python web framework
- [Flask-CORS](https://flask-cors.readthedocs.io/) - CORS support for Flask
- [Python 3.8+](https://www.python.org/) - Backend language

## Project Structure

```
IntellMeetingApp/
├── backend/               # Flask backend
│   ├── __init__.py
│   ├── app.py             # Alternative Flask app (monolithic)
│   ├── api.py             # API routes (Blueprint-based)
│   ├── models.py          # Data models
│   ├── run.py             # Application entry point
│   ├── config.py          # Configuration
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables example
│
├── src/                   # Next.js frontend
│   ├── app/               # Next.js pages and layouts
│   ├── components/        # React components
│   │   ├── cards/         # Analytics card components
│   │   └── icons/         # Icon components
│   ├── hooks/             # Custom React hooks
│   │   ├── useItemManager.ts  # CRUD state management hook
│   │   └── useApi.ts      # API communication hook
│   └── services/
│       └── api.ts         # API client
│
├── public/                # Static assets
├── .env.local             # Frontend environment variables
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Python (v3.8 or later)
- pip (Python package manager)

### Installation

#### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/IntellMeetingApp.git
cd IntellMeetingApp
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the project root with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend Setup

1. Set up a Python virtual environment (optional but recommended):
```bash
# Using venv
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Or using conda
conda create -n intellmeeting python=3.9
conda activate intellmeeting
```

2. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory (copy from .env.example):
```bash
cp .env.example .env
```

### Running the Application

1. Start the Flask backend:
```bash
cd backend
python run.py
# The API will be available at http://localhost:5000/api
```

2. In a new terminal, start the Next.js frontend:
```bash
# From the project root
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### API Testing

You can test the API endpoints using tools like cURL, Postman, or directly from the browser:

- Health check: http://localhost:5000/api/health
- Get all meetings: http://localhost:5000/api/meetings
- Get meeting by ID: http://localhost:5000/api/meetings/0
- Calculate meeting cost: http://localhost:5000/api/meetings/0/cost

### Production Build

For production deployment:

1. Frontend:
```bash
npm run build
npm start
```

2. Backend:
```bash
# Using gunicorn (production WSGI server)
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 "run:create_app()"
```

## Application Workflow

1. **Create Meeting**: Start by setting up a new meeting with title, date, and participants.
2. **Add Agenda Items**: Create and organize your meeting agenda with time allocations.
3. **Manage Participants**: Add participants and assign roles (host, presenter, attendee).
4. **Review Costs**: See estimated meeting costs based on participant count and duration.
5. **View Analytics**: After meetings, view detailed analytics on agenda coverage and participation.

## Development Notes

### Code Conventions

#### Frontend
- Components follow a functional approach with React hooks
- TypeScript interfaces defined for all component props
- Shared hooks for common functionalities
- Centralized icon management

#### Backend
- Blueprint-based API organization
- Model-driven data structure
- Environment-based configuration

### Shared Hooks

#### useItemManager

A custom hook for managing collections of items with CRUD operations:

```typescript
// Example usage
const { items, addItem, updateItem, deleteItem } = useItemManager<AgendaItem>({
  initialItems,
  defaultItems: defaultAgendaItems,
  onAdd: handleAddItem
});
```

#### useApi

A hook for simplified API communication with loading and error states:

```typescript
// Fetch data
const { data, loading, error } = useApi(() => api.getMeetings());

// Mutation
const { mutate, loading } = useMutation(api.createMeeting);
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- UI design inspired by modern meeting management tools
- Icons from Heroicons (via custom components)
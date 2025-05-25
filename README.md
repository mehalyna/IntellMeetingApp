# IntellMeetingApp

IntellMeetingApp is a Next.js application that helps users plan, manage, and analyze meetings with intelligent suggestions and detailed analytics. It provides tools for agenda creation, participant management, and post-meeting insights.

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

- [Next.js](https://nextjs.org/) - React framework with server-side rendering
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Project Structure

- `/src/app/` - Next.js app router pages and layouts
- `/src/components/` - Reusable UI components
  - `/src/components/cards/` - Card-based analytics components
  - `/src/components/icons/` - Shared icon components
- `/src/hooks/` - Custom React hooks
- `/public/` - Static assets

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/IntellMeetingApp.git
cd IntellMeetingApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

To create a production build:

```bash
npm run build
npm start
```

## Application Workflow

1. **Create Meeting**: Start by setting up a new meeting with title, date, and participants.
2. **Add Agenda Items**: Create and organize your meeting agenda with time allocations.
3. **Manage Participants**: Add participants and assign roles (host, presenter, attendee).
4. **Review Costs**: See estimated meeting costs based on participant count and duration.
5. **View Analytics**: After meetings, view detailed analytics on agenda coverage and participation.

## Development Notes

### Code Conventions

- Components follow a functional approach with React hooks
- TypeScript interfaces defined for all component props
- Shared hooks for common functionalities
- Centralized icon management

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
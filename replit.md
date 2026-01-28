# PropertyHub - Local Property Dealer Application

## Overview
PropertyHub is a full-stack property dealer application designed for local real estate businesses. It provides an easy-to-use, attractive interface for listing, searching, and inquiring about properties.

## Recent Changes
- **January 28, 2026**: Initial MVP implementation with property listings, search/filter, inquiry forms, and add property functionality

## Project Architecture

### Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **UI Components**: Shadcn/ui

### Directory Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (home, about, contact)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── index.css      # Global styles and design tokens
├── server/                 # Backend Express server
│   ├── routes.ts          # API route handlers
│   └── storage.ts         # In-memory data storage
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts          # Data types and validation schemas
```

### Key Features
1. **Property Listings**: Browse properties with images, prices, and details
2. **Search & Filter**: Search by location/title, filter by type, status, price range
3. **Property Details**: View full property information in a modal
4. **Inquiry System**: Send inquiries to property dealers
5. **Add Property**: List new properties with complete details
6. **Dark Mode**: Toggle between light and dark themes

### API Endpoints
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `POST /api/inquiries` - Submit property inquiry

### Data Models
- **Property**: id, title, description, price, type, status, location, area, bedrooms, bathrooms, imageUrl, features, isFeatured, contactPhone, contactName
- **Inquiry**: id, propertyId, name, email, phone, message

### Design Tokens
The app uses a warm, professional color scheme with:
- Primary: Warm orange-brown (#c56820 in light mode)
- Background: Light cream/warm white
- Cards: Pure white with subtle shadows
- Typography: Plus Jakarta Sans (sans), Playfair Display (serif)

### Running the Application
The application runs via the `Start application` workflow which executes `npm run dev`. The server runs on port 5000.

## User Preferences
- No specific user preferences recorded yet

## Notes
- In-memory storage is used for MVP (data resets on server restart)
- Sample properties are pre-loaded for demonstration
- All forms use proper validation with Zod schemas

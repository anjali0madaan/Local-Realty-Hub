# Raju Property Dealer - Local Property Dealer Application

## Overview
Raju Property Dealer is a full-stack property dealer application designed for local real estate businesses. It provides an easy-to-use, attractive interface for listing, searching, and inquiring about properties. The application includes a CMS admin panel for managing property listings.

## Recent Changes
- **January 30, 2026**: Added Vercel serverless API functions for deployment compatibility
- **January 30, 2026**: Fixed database connection to use individual PG* environment variables
- **January 30, 2026**: Integrated Cloudinary for image uploads in admin panel
- **January 28, 2026**: Added PostgreSQL database persistence and admin panel for property management
- **January 28, 2026**: Initial MVP implementation with property listings, search/filter, inquiry forms, and add property functionality

## Project Architecture

### Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **UI Components**: Shadcn/ui

### Directory Structure
```
├── api/                    # Vercel serverless API functions
│   ├── _db.ts             # Database connection for Vercel
│   ├── properties.ts      # GET/POST properties endpoint
│   ├── properties/[id].ts # GET/PATCH/DELETE single property
│   ├── inquiries.ts       # GET/POST inquiries endpoint
│   └── upload.ts          # Image upload to Cloudinary
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (home, about, contact, admin)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── index.css      # Global styles and design tokens
├── server/                 # Backend Express server (for local development)
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Database storage implementation
│   ├── db.ts              # Database connection
│   └── seed.ts            # Sample data seeding script
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts          # Drizzle schema and validation
```

### Key Features
1. **Property Listings**: Browse properties with images, prices, and details
2. **Search & Filter**: Search by location/title, filter by type, status, price range
3. **Property Details**: View full property information in a modal
4. **Inquiry System**: Send inquiries to property dealers
5. **Add Property**: List new properties with complete details
6. **Admin Panel**: Manage properties (add, edit, delete) and view inquiries
7. **Dark Mode**: Toggle between light and dark themes
8. **Persistent Storage**: PostgreSQL database for data persistence

### API Endpoints
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `POST /api/inquiries` - Submit property inquiry
- `GET /api/inquiries` - List all inquiries (admin)

### Database Schema
- **properties**: id, title, description, price, type, status, location, area, bedrooms, bathrooms, image_url, features, is_featured, contact_phone, contact_name
- **inquiries**: id, property_id, name, email, phone, message
- **users**: id, username, password

### Design Tokens
The app uses a warm, professional color scheme with:
- Primary: Warm orange-brown (#c56820 in light mode)
- Background: Light cream/warm white
- Cards: Pure white with subtle shadows
- Typography: Plus Jakarta Sans (sans), Playfair Display (serif)

### Running the Application
The application runs via the `Start application` workflow which executes `npm run dev`. The server runs on port 5000.

### Database Commands
- `npm run db:push` - Push schema changes to database
- `npx tsx server/seed.ts` - Seed sample data

## User Preferences
- No specific user preferences recorded yet

## Notes
- PostgreSQL database stores all property and inquiry data persistently
- Sample properties are seeded on first run
- All forms use proper validation with Zod schemas
- Admin panel accessible at /admin for property management

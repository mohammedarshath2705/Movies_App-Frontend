# Movies App - Frontend

A modern, full-stack movie discovery application built with Next.js, React, and TypeScript. Features include user authentication (traditional and OAuth), movie browsing, search functionality, and personalized favorites management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Key Components](#key-components)
- [Styling](#styling)
- [Deployment](#deployment)

## Features

- **User Authentication**
  - Traditional username/password authentication
  - Google OAuth 2.0 integration
  - JWT-based session management
  - Protected routes and authenticated pages

- **Movie Discovery**
  - Browse top-rated and trending movies
  - Search movies by title
  - Detailed movie information pages
  - Movie poster display with fallback support

- **Favorites Management**
  - Add/remove movies to personal favorites
  - Persistent favorites across sessions
  - Visual indicators for favorited movies

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Modern UI with Tailwind CSS 4

## Tech Stack

- **Framework**: Next.js 15.4.1 (App Router)
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React 0.525.0, React Icons 5.5.0
- **Authentication**: JWT tokens, Google OAuth 2.0
- **HTTP Client**: Native Fetch API

## Prerequisites

- Node.js 18.18.0 or higher
- npm, yarn, pnpm, or bun package manager
- Backend API server running (see API Integration section)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammedarshath2705/Movies_App-Frontend.git
cd Movies_App-Frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment configuration file (see Configuration section)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8080/api/auth
NEXT_PUBLIC_OAUTH_GOOGLE_URL=http://localhost:8080/oauth2/authorization/google
```

Adjust the URLs based on your backend server configuration.

## Project Structure
```
moviesapp-front/
├── public/
│   ├── hero.mp4              # Landing page background video
│   └── Placeholder.jpg       # Fallback movie poster
├── src/
│   ├── app/
│   │   ├── login/           # Login page
│   │   ├── signup/          # Registration page
│   │   ├── movies/          # Movies listing and search
│   │   │   ├── [id]/       # Individual movie details
│   │   │   └── search/     # Search results page
│   │   ├── oauth-success/   # OAuth callback handler
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── AuthHeader.tsx   # User profile header
│   │   ├── MoviePoster.tsx  # Movie poster component
│   │   ├── MoviesGrid.tsx   # Grid layout for movies
│   │   ├── MoviesPage.tsx   # Main movies page logic
│   │   └── SearchBar.tsx    # Search input component
│   ├── services/
│   │   ├── movieService.ts  # Movie API calls
│   │   └── favouriteService.ts # Favorites API calls
│   ├── types/
│   │   └── movie.ts         # TypeScript interfaces
│   └── lib/
│       └── config.ts        # API configuration
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## API Integration

The application integrates with a backend API for the following operations:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `GET /oauth2/authorization/google` - Google OAuth initiation

### Movie Endpoints
- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID
- `GET /api/movies/search?title={query}` - Search movies by title

### Favorites Endpoints
- `GET /api/users/{userId}/favourites` - Get user favorites
- `POST /api/users/{userId}/favourites/{movieId}` - Add to favorites
- `DELETE /api/users/{userId}/favourites/{movieId}` - Remove from favorites

All authenticated requests include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Authentication Flow

### Traditional Login
1. User submits username and password
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. User redirected to movies page

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. After approval, Google redirects to backend callback
4. Backend creates/updates user and generates JWT
5. User redirected to `/oauth-success` with token in URL
6. Frontend extracts token and stores in localStorage
7. User redirected to movies page

### Session Management
- JWT token stored in localStorage
- Token included in all API requests
- User info (userId, username, email) cached locally
- Logout clears all stored data

## Key Components

### AuthHeader
Displays user profile information and logout functionality. Shows user initial or avatar, username, and email. Listens for storage events to update in real-time.

### SearchBar
Provides movie search functionality with debouncing. Navigates to search results page with query parameter.

### MoviesGrid
Responsive grid layout for displaying movie cards. Shows movie posters, titles, ratings, and favorite indicators.

### MoviePoster
Handles movie poster display with automatic fallback to placeholder image on load errors.

## Styling

The application uses Tailwind CSS 4 for styling with the following approach:

- **Dark Theme**: Primary color scheme with gray-900 background
- **Custom Components**: Styled using Tailwind utility classes
- **Responsive Design**: Mobile-first breakpoints (sm, md, lg)
- **Animations**: Smooth transitions and hover effects
- **Backdrop Effects**: Blur and transparency for modern UI

PostCSS configuration:
```javascript
plugins: ["@tailwindcss/postcss"]
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm run start
```

3. Configure reverse proxy (nginx/Apache) to serve the application

### Environment Variables
Ensure all required environment variables are set in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_AUTH_URL`
- `NEXT_PUBLIC_OAUTH_GOOGLE_URL`



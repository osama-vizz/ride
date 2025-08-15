# RideShare Pro

## Overview

RideShare Pro is a full-stack ride booking platform built with React and Express. The application allows users to browse available vehicles, make bookings, and complete payments through Stripe integration. It features a modern UI with shadcn/ui components, comprehensive admin controls, and secure authentication through Replit Auth.

The platform serves both regular users who can book rides and administrators who can manage the vehicle fleet and view analytics. The application includes real-time booking management, payment processing, and a responsive design that works across desktop and mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with conditional rendering based on authentication state
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect, using Passport.js for session management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful endpoints with proper error handling and request logging middleware

### Data Storage Solutions
- **Primary Database**: Neon PostgreSQL for production data
- **ORM**: Drizzle with code-first schema definitions in TypeScript
- **Migration Strategy**: Drizzle Kit for database schema migrations
- **Session Management**: Database-stored sessions with configurable TTL

### Authentication and Authorization
- **Provider**: Replit Auth with OpenID Connect protocol
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Access Control**: Role-based permissions (user/admin) with middleware protection
- **Security**: HTTP-only cookies, CSRF protection, and secure session configuration

### Key Design Patterns
- **Monorepo Structure**: Shared schema and types between client and server
- **Type Safety**: End-to-end TypeScript with shared interfaces and Zod validation
- **Error Handling**: Centralized error handling with user-friendly error messages
- **Data Fetching**: React Query for caching, background updates, and optimistic updates
- **Component Architecture**: Reusable UI components with proper separation of concerns

## External Dependencies

### Payment Processing
- **Stripe**: Complete payment processing with Elements for secure card collection
- **Integration**: Server-side payment intent creation and client-side confirmation
- **Security**: PCI-compliant payment handling with webhook support

### Database Services
- **Neon**: Serverless PostgreSQL with connection pooling
- **WebSocket Support**: Real-time capabilities through WebSocket connections

### UI and Design
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide Icons**: Consistent icon library for UI elements
- **Google Fonts**: Custom typography with Inter and other web fonts

### Development Tools
- **ESBuild**: Fast bundling for production server builds
- **Vite**: Development server with hot module replacement
- **TypeScript**: Static type checking across the entire application
- **Replit Integration**: Development environment integration with error overlays and debugging tools
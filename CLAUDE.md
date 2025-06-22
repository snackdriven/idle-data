# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an uptime monitoring system built with Encore.dev - an event-driven microservices application using Pub/Sub for asynchronous communication. The system monitors websites, detects when they go down/up, and sends notifications.

### Architecture

The application consists of 4 microservices:
- **frontend**: Next.js React frontend (port 4000 when running locally)
- **monitor**: Pings websites and stores uptime results in database
- **site**: Manages the list of monitored websites with PostgreSQL storage

Key patterns:
- Each service has an `encore.service.ts` file defining the service
- Services communicate via Pub/Sub topics (e.g., `site.added`, transitions)
- Database migrations are in `migrations/` directories within each service
- Generated client code is in `encore.gen/` (do not edit manually)

## Development Commands

**Run the application:**
```bash
encore run
```
This starts all services and the frontend at http://localhost:4000/ with the Encore developer dashboard at http://localhost:9400/

**Run tests:**
```bash
encore test
# or directly with vitest
npm run test
```

**Generate frontend client:**
```bash
npm run gen
# Generates TypeScript client at ./frontend/app/lib/client.ts
```

**Code formatting/linting:**
```bash
# The project uses Biome for formatting and linting
npx biome format --write .
npx biome lint .
```

**Database operations:**
```bash
# Connect to local database
encore db shell <database-name> --env=local --superuser
```

## Key Configuration Files

- `biome.json`: Code formatting (tabs, double quotes) and linting rules
- `encore.app`: Binary Encore configuration file
- `vite.config.ts`: Vite config with alias for `~encore` -> `./encore.gen`
- `package.json`: Uses Vitest for testing, includes Encore.dev dependencies

## Frontend Architecture

The frontend uses a modern component-based architecture with:

- **Component Library**: Located in `frontend/app/components/ui/`
  - `Button`, `Input`, `TextArea`, `Select` - Form components with accessibility
  - `Card`, `CardHeader`, `CardContent`, `CardFooter` - Layout components
  - `Toast`, `ToastContainer` - Notification system
  - `ThemeToggle` - Dark/light mode switcher
  - `Modal`, `LoadingSkeleton` - UI utilities

- **Layout Components**: Located in `frontend/app/components/layout/`
  - `Header`, `Navigation`, `UserHeader` - Application layout

- **Design System**: Located in `frontend/app/styles/`
  - `variables.css` - CSS custom properties with semantic color scales, fluid typography, responsive spacing
  - `components.css` - Component styles using design tokens
  - `globals.css` - Global styles and legacy journal theming

- **Theme System**: Dark/light mode support via `ThemeContext`
  - Automatic system preference detection
  - Persistent theme storage in localStorage
  - CSS custom properties for seamless theme switching

## Development Notes

- Cron jobs do not execute when running locally with `encore run`
- Frontend uses Next.js 14 with React Query for API calls
- Database uses PostgreSQL with Knex.js ORM
- Services use `encore.dev/api` for HTTP endpoints and `encore.dev/pubsub` for events
- Generated code in `encore.gen/` should never be manually edited - regenerate with `npm run gen`
- All UI components follow accessibility guidelines with ARIA labels and keyboard navigation
- Component library includes Storybook stories for development and documentation

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

- `NODE_ENV`: Development environment (development/production)
- `SLACK_WEBHOOK_URL`: Webhook URL for Slack notifications (set via `encore secret set`)
- Database configuration is handled automatically by Encore

## Testing

The project uses Vitest for testing with React Testing Library:

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests once (CI mode)
npm run test:run
```

## Code Quality

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Biome**: Used for formatting and linting
- **Husky**: Git hooks for pre-commit quality checks
- **Error Boundaries**: Comprehensive error handling throughout the application
- **Testing**: Unit tests for all components with good coverage
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an uptime monitoring system built with Encore.dev - an event-driven microservices application using Pub/Sub for asynchronous communication. The system monitors websites, detects when they go down/up, and sends Slack notifications.

### Architecture

The application consists of 4 microservices:
- **frontend**: Next.js React frontend (port 4000 when running locally)
- **monitor**: Pings websites and stores uptime results in database
- **site**: Manages the list of monitored websites with PostgreSQL storage
- **slack**: Sends notifications via Slack webhooks using Pub/Sub events

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

**Secrets management:**
```bash
# Set Slack webhook URL for notifications
encore secret set --type local,dev,pr,prod SlackWebhookURL
```

## Key Configuration Files

- `biome.json`: Code formatting (tabs, double quotes) and linting rules
- `encore.app`: Binary Encore configuration file
- `vite.config.ts`: Vite config with alias for `~encore` -> `./encore.gen`
- `package.json`: Uses Vitest for testing, includes Encore.dev dependencies

## Development Notes

- Cron jobs do not execute when running locally with `encore run`
- Frontend uses Next.js 14 with React Query for API calls
- Database uses PostgreSQL with Knex.js ORM
- Services use `encore.dev/api` for HTTP endpoints and `encore.dev/pubsub` for events
- Generated code in `encore.gen/` should never be manually edited - regenerate with `npm run gen`
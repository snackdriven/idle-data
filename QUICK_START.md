# Quick Start Guide

## Installation

### Option 1: Automated Setup (Recommended)

1. **Run the Installation Script**
```bash
# In WSL or Linux terminal
chmod +x install.sh
./install.sh
```

The script will:
- Install all required dependencies (Node.js, Encore CLI)
- Set up Git configuration
- Install project dependencies
- Configure development environment
- Set up Docker environment (optional)

### Option 2: Manual Setup

1. **Install Dependencies**
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Encore CLI
curl -L https://encore.dev/install.sh | bash

# Install project dependencies
npm install
cd frontend && npm install && cd ..
```

## Running the Application

### Option 1: Local Development

1. **Start Backend**
```bash
encore run
```

2. **Start Frontend** (in a new terminal)
```bash
cd frontend
npm run dev
```

3. **Start Storybook** (optional)
```bash
npm run storybook
```

### Option 2: Docker Development

1. **Start All Services**
```bash
docker-compose up --build
```

## Access Points

- Frontend: http://localhost:3000
- Backend API & Docs: http://localhost:4000
- Storybook: http://localhost:6006

## Development Tips

- Backend changes are automatically reloaded
- Frontend has hot module replacement enabled
- Storybook supports live component editing
- Use the API docs at http://localhost:4000/docs for backend development
- Check Storybook for component documentation and examples

## Common Commands

```bash
# Git Commands
git status                  # Check repository status
git pull                   # Get latest changes
git push                   # Push your changes
git add .                  # Stage all changes
git commit -m "message"    # Commit changes

# Database Commands
encore db reset           # Reset database
encore db shell          # Open database shell

# Development Commands
encore test              # Run tests
npm run build           # Build for production
npm run start           # Start production server

# Docker Commands
docker-compose up       # Start all services
docker-compose down     # Stop all services
docker-compose logs     # View service logs
```

## Environment Setup

The `.env` file contains important configuration. Key variables:

```bash
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:4000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=idle_data

# Monitoring Configuration
MONITOR_INTERVAL=300
```

## Project Structure

```
idle-data/
├── frontend/          # Next.js frontend application
├── journal/          # Journal service
├── monitor/          # Monitoring service
├── site/            # Site service
└── docker/          # Docker configuration
```

## Troubleshooting

1. **Port Conflicts**
   - Ensure ports 3000 (frontend) and 4000 (backend) are available
   - Use `lsof -i :PORT` to check port usage

2. **Database Issues**
   - Check database connection in `.env`
   - Use `encore db reset` to reset the database
   - Verify PostgreSQL is running (`docker ps` if using Docker)

3. **WSL Issues**
   - Ensure WSL2 is installed and configured
   - Check file permissions
   - Use `wsl --shutdown` and restart if needed

## Getting Help

### AI Development Assistance

#### Using AI Assistants Effectively
- When asking for help, provide:
  - File paths relative to the project root
  - Relevant error messages in full
  - Current and expected behavior
  - Code context around the issue
  - Any previous solutions attempted

#### Project Structure for AI Understanding
```
idle-data/
├── frontend/          # Next.js frontend application
├── journal/          # Journal service
├── monitor/          # Monitoring service
├── site/            # Site management service
└── package.json     # Root dependencies
```

#### Key Project Technologies
- **Encore.ts**: Backend framework for TypeScript APIs
- **Next.js**: React framework for frontend
- **PostgreSQL**: Database system
- **TypeScript**: Programming language
- **Jest**: Testing framework
- **Storybook**: UI component development

### Official Documentation Links

#### Core Technologies
```typescript
// Encore.ts API Example
import { api } from "encore.dev/api";
export const endpoint = api(
  { method: "GET" },
  async (): Promise<Response> => {
    return { data: "example" };
  }
);

// Next.js Page Example
export default function Page() {
  return <div>Next.js Page</div>;
}
```

- Encore.ts: https://encore.dev/docs
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs
- PostgreSQL: https://www.postgresql.org/docs/current
- React: https://react.dev
- Jest: https://jestjs.io/docs
- Storybook: https://storybook.js.org/docs

### Common Code Patterns

#### API Endpoints
```typescript
// Standard API endpoint pattern
import { api } from "encore.dev/api";

interface RequestType {
  param: string;
}

interface ResponseType {
  data: string;
}

export const endpoint = api<RequestType, ResponseType>(
  { method: "POST" },
  async (params) => {
    return { data: params.param };
  }
);
```

#### Database Operations
```typescript
// Database query pattern
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("name", {
  migrations: "./migrations",
});

// Query example
const result = await db.query`
  SELECT * FROM table 
  WHERE column = ${value}
`;
```

#### Frontend Components
```typescript
// React component pattern
import { useState } from 'react';

interface Props {
  title: string;
}

export function Component({ title }: Props) {
  const [state, setState] = useState('');
  return <div>{title}</div>;
}
```

### Error Resolution Patterns

#### Common Error Types
```typescript
// API Error handling
import { APIError } from "encore.dev/api";

try {
  // Operation
} catch (err) {
  throw new APIError(ErrCode.NotFound, "Resource not found");
}

// Database Error handling
try {
  await db.query`SELECT * FROM table`;
} catch (err) {
  console.error("Database error:", err);
}
```

### Testing Patterns
```typescript
// Jest test example
import { describe, it, expect } from '@jest/globals';

describe('Component', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});

// API test example
import { endpoint } from './api';

describe('API', () => {
  it('should handle request', async () => {
    const response = await endpoint({ param: 'test' });
    expect(response.data).toBe('test');
  });
});
```

### File Naming Conventions
- API files: `*.ts`
- Components: `*.tsx`
- Tests: `*.test.ts`
- Stories: `*.stories.tsx`
- Migrations: `*_name.up.sql`
- Services: `encore.service.ts`

### Project-Specific Commands
```bash
# Development
npm run dev          # Start development server
npm run test        # Run tests
npm run build       # Build project
npm run storybook   # Start Storybook

# Encore Commands
encore run          # Run local development
encore test         # Run tests
encore db shell     # Access database
```

### Troubleshooting Guide for AI

When encountering issues, check these common areas:
1. Database connectivity
2. API endpoint configuration
3. TypeScript type definitions
4. Frontend component props
5. Environment variables
6. Service dependencies

### Repository Structure for AI Navigation
- `/frontend/app/`: Next.js pages and components
- `/*/migrations/`: SQL migrations for each service
- `/*/encore.service.ts`: Service definitions
- `/*.ts`: API endpoint definitions
- `/frontend/app/components/`: React components

### AI-Friendly Code Search Paths
- API Endpoints: `**/*.ts` (excluding test files)
- Components: `frontend/app/components/**/*.tsx`
- Database Schema: `*/migrations/*.up.sql`
- Tests: `**/*.test.ts`
- Types: `**/*.d.ts`

This structure provides AI assistants with clear patterns, examples, and context for helping with development tasks.

### Framework Documentation

#### Encore.ts
- [Encore Documentation](https://encore.dev/docs)
  - [API Development Guide](https://encore.dev/docs/develop/api-schemas)
  - [Database Management](https://encore.dev/docs/develop/databases)
  - [Authentication](https://encore.dev/docs/develop/auth)
  - [Secrets Management](https://encore.dev/docs/develop/secrets)
  - [Deployment Guide](https://encore.dev/docs/deploy/deploying)

#### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
  - [Routing](https://nextjs.org/docs/app/building-your-application/routing)
  - [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
  - [Styling](https://nextjs.org/docs/app/building-your-application/styling)
  - [Optimizations](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Documentation](https://react.dev)
  - [Learn React](https://react.dev/learn)
  - [API Reference](https://react.dev/reference/react)
  - [Hooks Guide](https://react.dev/reference/react/hooks)

### Language References

#### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
  - [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
  - [Type System](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
  - [Classes & Interfaces](https://www.typescriptlang.org/docs/handbook/2/classes.html)
  - [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

#### SQL & PostgreSQL
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
  - [SQL Commands](https://www.postgresql.org/docs/current/sql-commands.html)
  - [Data Types](https://www.postgresql.org/docs/current/datatype.html)
  - [Performance Tips](https://www.postgresql.org/docs/current/performance-tips.html)

### Development Tools

#### Git & GitHub
- [Git Documentation](https://git-scm.com/doc)
  - [Pro Git Book](https://git-scm.com/book/en/v2)
  - [Git Command Reference](https://git-scm.com/docs)
- [GitHub Guides](https://docs.github.com/en)
  - [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
  - [Pull Requests](https://docs.github.com/en/pull-requests)

#### Docker
- [Docker Documentation](https://docs.docker.com/)
  - [Get Started](https://docs.docker.com/get-started/)
  - [Compose Guide](https://docs.docker.com/compose/)
  - [Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

#### WSL (Windows Subsystem for Linux)
- [WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/)
  - [Installation Guide](https://learn.microsoft.com/en-us/windows/wsl/install)
  - [Basic Commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
  - [Troubleshooting](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting)

### Testing & Development

#### Jest
- [Jest Documentation](https://jestjs.io/docs/getting-started)
  - [API Reference](https://jestjs.io/docs/api)
  - [Expect Methods](https://jestjs.io/docs/expect)
  - [Mock Functions](https://jestjs.io/docs/mock-functions)

#### Storybook
- [Storybook Documentation](https://storybook.js.org/docs)
  - [Writing Stories](https://storybook.js.org/docs/writing-stories)
  - [Component Testing](https://storybook.js.org/docs/writing-tests)
  - [Addons](https://storybook.js.org/docs/addons)

### Project-Specific Resources

- Review project-specific documentation in the `docs` directory
- Check the project's GitHub repository Issues and Discussions
- Review the [CONTRIBUTING.md](./CONTRIBUTING.md) guide for development guidelines
- Join our [Discord Community](https://discord.gg/your-server) for real-time help

### Common Issues & Solutions

For common issues not covered in the troubleshooting section:
1. Search the project's GitHub Issues
2. Check Stack Overflow with the following tags:
   - [encore-dev](https://stackoverflow.com/questions/tagged/encore-dev)
   - [nextjs](https://stackoverflow.com/questions/tagged/next.js)
   - [typescript](https://stackoverflow.com/questions/tagged/typescript)
   - [postgresql](https://stackoverflow.com/questions/tagged/postgresql)

### Security & Updates

- [Node.js Security Releases](https://nodejs.org/en/blog/vulnerability)
- [Next.js Security Updates](https://nextjs.org/blog/security)
- [PostgreSQL Security Information](https://www.postgresql.org/support/security/)
- [TypeScript Release Notes](https://devblogs.microsoft.com/typescript/)

### Community Support

- Join [Encore's Discord](https://encore.dev/discord)
- Participate in [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- Follow [TypeScript on GitHub](https://github.com/microsoft/TypeScript)
- Join [PostgreSQL Community](https://www.postgresql.org/community/) 
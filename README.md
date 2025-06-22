

## Prerequisites 

**Install Encore:**
- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`
  
**Docker:**
1. Install [Docker](https://docker.com)
2. Start Docker

## Create app

Create a local app from this template:

```bash
encore app create uptime-example --example=ts/uptime
```

## Run app locally

Before running your application, make sure you have Docker installed and running. Then run this command from your application's root folder:

```bash
encore run
```

**Note:** Cron Jobs do not execute when running locally.

## View the frontend

While `encore run` is running, head over to [http://localhost:4000/](http://localhost:4000/) to view the frontend for your uptime monitor.

## Using the API

Check if a given site is up (defaults to 'https://' if left out):
```bash
curl 'http://localhost:4000/ping/google.com'
```

Add a site to be automatically pinged every 1 hour:
```bash
curl 'http://localhost:4000/site' -d '{"url":"google.com"}'
```

Check all tracked sites immediately:
```bash
curl -X POST 'http://localhost:4000/check-all'
```

Get the current status of all tracked sites:
```bash
curl 'http://localhost:4000/status'
```

## Local Development Dashboard

While `encore run` is running, open [http://localhost:9400/](http://localhost:9400/) to access Encore's [local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash).

Here you can see traces for all requests that you made while using the frontend, see your architecture diagram, and view API documentation in the Service Catalog.

## Connecting to databases

You can connect to your databases via psql shell:

```bash
encore db shell <database-name> --env=local --superuser
```

Learn more in the [CLI docs](https://encore.dev/docs/ts/cli/cli-reference#database-management).

## Deployment

### Self-hosting

See the [self-hosting instructions](https://encore.dev/docs/ts/self-host/build) for how to use `encore build docker` to create a Docker image and configure it.

### Encore Cloud Platform

Deploy your application to a free staging environment in Encore's development cloud using `git push encore`:

```bash
git add -A .
git commit -m 'Commit message'
git push encore
```

You can also open your app in the [Cloud Dashboard](https://app.encore.dev) to integrate with GitHub, or connect your AWS/GCP account, enabling Encore to automatically handle cloud deployments for you.

## Link to GitHub

Follow these steps to link your app to GitHub:

1. Create a GitHub repo, commit and push the app.
2. Open your app in the [Cloud Dashboard](https://app.encore.dev).
3. Go to **Settings ➔ GitHub** and click on **Link app to GitHub** to link your app to GitHub and select the repo you just created.
4. To configure Encore to automatically trigger deploys when you push to a specific branch name, go to the **Overview** page for your intended environment. Click on **Settings** and then in the section **Branch Push** configure the **Branch name** and hit **Save**.
5. Commit and push a change to GitHub to trigger a deploy.

[Learn more in the docs](https://encore.dev/docs/platform/integrations/github)

## Testing

To run tests, configure the `test` command in your `package.json` to the test runner of your choice, and then use the command `encore test` from the CLI. The `encore test` command sets up all the necessary infrastructure in test mode before handing over to the test runner. [Learn more](https://encore.dev/docs/ts/develop/testing)

```bash
encore test
```

# Idle Data - LiveJournal-style Web Application

A modern web application built with Encore.ts, Next.js, and TypeScript, featuring a responsive UI with dark mode support and optimized performance.

## Prerequisites

- Node.js v20 or later
- npm v9 or later
- [Encore CLI](https://encore.dev/docs/install)

## Project Structure

```
idle-data/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   │   ├── components/  # Reusable UI components
│   │   │   ├── layout/   # Layout components
│   │   │   ├── ui/       # UI component library
│   │   │   └── utils/    # Utility components
│   │   ├── contexts/   # React contexts
│   │   ├── hooks/      # Custom React hooks
│   │   └── styles/     # CSS styles and variables
├── journal/          # Journal service
├── monitor/          # Monitoring service
└── site/            # Site management service
```

## Features

- 🎨 **Modern Design System**: Comprehensive color scales, fluid typography, responsive spacing
- 🌙 **Dark Mode**: Complete theme system with automatic detection and toggle UI
- 📱 **Responsive Design**: Mobile-first approach with fluid layouts and components
- ⚡ **Performance**: Optimized loading with code splitting and lazy components
- 🧩 **Component Library**: Reusable UI components with variants and accessibility
- 📚 **Documentation**: Complete Storybook stories for all components
- 🔄 **Optimistic Updates**: Better UX with immediate feedback and error handling
- ♿ **Accessibility**: ARIA labels, keyboard navigation, focus management
- 🎯 **Toast Notifications**: Modern notification system with animations
- 🎛️ **Theme Toggle**: Seamless dark/light mode switching with persistence

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create a .env file in the root directory
cp .env.example .env
```

## Development

### Starting the Backend

The backend is powered by Encore.ts. To start the development server:

```bash
encore run
```

This will:
- Start all backend services
- Run database migrations
- Watch for file changes
- Available at http://localhost:4000

### Starting the Frontend

The frontend is a Next.js application. To start the development server:

```bash
# From the project root
cd frontend
npm run dev
```

This will:
- Start the Next.js development server
- Enable hot module replacement
- Available at http://localhost:3000

### Running Storybook

Storybook is used for component development and documentation:

```bash
# From the project root
npm run storybook
```

This will:
- Start the Storybook development server
- Open the browser automatically
- Available at http://localhost:6006

## Component Library

Our modern UI component library includes:

- **Layout Components**
  - Header - Main application header with theme toggle
  - Navigation - Navigation menu with active state
  - UserHeader - User profile header

- **UI Components**
  - Button - Customizable button with variants (primary, secondary, danger) and loading states
  - Input - Form input with validation, labels, and error handling
  - TextArea - Multi-line text input with validation
  - Select - Dropdown select component with options
  - Card - Flexible card component with header, content, footer sections
  - Toast - Notification system with success, error, warning, info variants
  - ThemeToggle - Dark/light mode switcher with icon and button variants
  - Modal - Accessible modal dialog with overlay
  - LoadingSkeleton - Loading state placeholder with animations

- **Utility Components**
  - LazyLoad - Component lazy loading utility
  - ToastContainer - Container for managing toast notifications

## Custom Hooks

- `useForm` - Form state management and validation
- `useMutation` - Data mutation with optimistic updates

## Design System

Our modern design system features:

- **CSS Variables**: Semantic design tokens for colors, spacing, typography
- **Color System**: Comprehensive color scales (primary 50-900, gray 50-900) with dark mode variants
- **Typography**: Fluid typography system with clamp() for responsive scaling
- **Spacing**: Comprehensive spacing scale with responsive container spacing
- **Dark Mode**: Complete theme support with automatic system preference detection
- **Responsive Design**: Mobile-first approach with fluid spacing and typography
- **Accessibility**: ARIA labels, focus management, keyboard navigation throughout
- **Component Variants**: Multiple variants and sizes for all components

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run build` - Build the frontend for production
- `npm run start` - Start the production frontend server
- `npm run storybook` - Start Storybook for component development
- `npm run build-storybook` - Build Storybook for static deployment

## Development Workflow

1. Start the backend server:
```bash
encore run
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. (Optional) Start Storybook for component development:
```bash
npm run storybook
```

## API Documentation

- Backend API documentation is available at http://localhost:4000/docs when running the development server
- Component documentation is available in Storybook at http://localhost:6006

## Database Management

Encore handles database migrations automatically. However, you can use these commands for database operations:

```bash
# Reset database (development only)
encore db reset

# Connect to database shell
encore db shell <database-name> --env=local --superuser
```

## Future Improvements

- [ ] Add keyboard navigation support
- [ ] Implement infinite scrolling
- [ ] Add search functionality
- [ ] Implement real-time updates
- [ ] Add analytics tracking
- [ ] Implement error tracking
- [ ] Add performance monitoring

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure Storybook documentation is updated
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

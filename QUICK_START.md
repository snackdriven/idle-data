# Quick Start Guide

## In 3 Steps

1. **Start Backend**
```bash
encore run
```

2. **Start Frontend**
```bash
cd frontend
npm run dev
```

3. **Start Storybook** (optional)
```bash
npm run storybook
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
# Reset database
encore db reset

# Run tests
encore test

# Build for production
npm run build

# Start production server
npm run start
``` 
# Journal App

A simple journaling app built with Vite, React and TypeScript. The backend API uses [Hono](https://honojs.dev/) and can be replaced with Encore.dev when available.

## Development

1. Start the API server:

```bash
bun run server
```

2. In another terminal, start the frontend:

```bash
bun run dev
```

Open <http://localhost:5173> in your browser.

Formatting and linting are handled by [Biome](https://biomejs.dev):

```bash
bun run lint
bun run format
```

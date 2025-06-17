# Journal App

A simple journaling app built with Vite, React and TypeScript. The backend API uses [Hono](https://honojs.dev/) by default but is intended to run on [Encore](https://encore.dev) when the CLI is installed.

To install the Encore CLI locally run:

```bash
curl -fsSL https://get.encore.dev | bash
```

Note: the command may fail in restricted environments.

## Development

1. Start the API server:

```bash
npm run server
```

2. In another terminal, start the frontend:

```bash
npm run dev
```

Open <http://localhost:5173> in your browser.

Formatting and linting are handled by [Biome](https://biomejs.dev):

```bash
npm run lint
npm run format
```

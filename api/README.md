# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Environment
SEC EDGAR requires a descriptive `User-Agent` on every request. Copy the example env file and set your contact info before running the API:

```bash
cp .env-example .env
```

Then edit `.env` and set `EDGAR_USER_AGENT` to something like `"Your Name your.email@example.com"`. Bun loads `.env` automatically, and the value is used by `src/lib/fetchEdgarApi.ts` when calling EDGAR endpoints.

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
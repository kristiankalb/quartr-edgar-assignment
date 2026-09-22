# quartr-edgar-internal

## API

### Install Bun

Follow the instructions at https://bun.com/docs/installation to install Bun.

### Install dependencies

```bash
cd api
bun install
```

### Configure environment

```bash
cp .env-example .env
```

Set `EDGAR_USER_AGENT` to a descriptive User-Agent (`"Your Name your.email@example.com"`). SEC EDGAR requires it on every request.

### Start the API

```bash
bun run dev
```

## Web

### Install dependencies

```bash
cd web
npm install
```

### Configure environment

```bash
cp .env.example .env
```

`FILINGS_API_URL` points at the running API (default `http://localhost:3002`).

### Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

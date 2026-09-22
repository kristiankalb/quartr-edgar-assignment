# Prompt Log

Each entry records the editor context, the verbatim user prompt, and a brief summary of the changes made.

---

### Context

README.md

### Prompt

Add instructions to get the api up and running, installing bun, https://bun.com/docs/installation, installing dependencis and then starting it.

### Summary

Added a Getting Started section to README.md with a Bun install link, `bun install`, and `bun run dev` steps.

---

### Context

prompt-log.md, AGENTS.md

### Prompt

What would be a good format for a prompt log? Check the instructions in the assigment folder. Also update the AGENTS.md with unskippable instructions to populate the log at the end of every prompt

### Summary

Reviewed the assignment instructions, defined the Context/Prompt/Summary log format above, and added a mandatory logging rule to AGENTS.md.

---

### Context

AGENTS.md (active), api/src/\*\*, api/README.md, api/.env-example

### Prompt

Create scaffolding for the api using a feature based structure. Do not create any logic, just the files and connections. I need two GET endpoints, `/companies/:ticker/filings` and `/filings/summary`. I also need a feature to resolve company tickers to cik. Name the files for each feature index, service and types. All endpoints should use a fetchEdgarApi fetch wrapper under lib folder which takes an api url and adds User-Agent from local .env file (also create an .env-example). Update the readme with instructions regarding the env file usage.

### Summary

## Scaffolded `api/src/lib/fetchEdgarApi.ts` reading `EDGAR_USER_AGENT` from env, and feature folders `tickers/`, `filings/`, `summary/` each with `index.ts`, `service.ts`, `types.ts` (services throw "Not implemented"). Wired `filingsRoutes` (`GET /companies/:ticker/filings`) and `summaryRoutes` (`GET /filings/summary`) into `src/index.ts`. Added `api/.env-example` and README env setup section.

### Context

api/src/features/filings/types.ts (active)

### Prompt

Update the Filing type with all the fields from the api response https://data.sec.gov/submissions/CIK0000320193.json

### Summary

Replaced the Filing type in api/src/features/filings/types.ts with the full set of fields returned by the SEC submissions `filings.recent` object (accessionNumber, filingDate, reportDate, acceptanceDateTime, act, form, fileNumber, filmNumber, items, core_type, size, isXBRL, isInlineXBRL, isXBRLNumeric, primaryDocument, primaryDocDescription); removed the unused `primaryDocumentUrl` field.

---

### Context

api/src/features/filings/service.ts (active), api/src/features/filings/types.ts

### Prompt

Create a type for filing.files from the api response https://data.sec.gov/submissions/CIK0000320193.json

### Summary

Added a `FilingsFile` type in api/src/features/filings/types.ts modeling the entries of `filings.files` (name, filingCount, filingFrom, filingTo).

---

### Context

api/src/features/filings/service.ts (active), api/src/features/summary/**, api/src/lib/**

### Prompt

Make a plan to create a summary service: Given a set of companies (tickers), it returns each company's number of filings per form type over the last 12 months and the date of its latest `10-K`. Reuse as much code as possible from the filings service, extracting any shared code into standlone files in the lib folder.

### Summary

Proposed a plan: extract shared `Filing`/`FilingsFile` types to `lib/types.ts` and a `loadCompanyFilings(ticker)` helper to `lib/loadCompanyFilings.ts` (ticker→CIK, fetch submissions + paginated files, normalize columnar data, sort desc). Refactor `filings/service.ts` to use it while keeping `createDocumentUrl`, filtering, and pagination local. Implement `summary/service.ts` to load filings per ticker in parallel, filter to the last 12 months for `countsByForm`, and pick the first `10-K` from the sorted list for `latest10KDate`. Awaiting confirmation on error handling for unresolved tickers before implementing.

---

### Context

api/src/features/filings/service.ts (active), api/src/features/summary/**, api/src/lib/**

### Prompt

Implement, add a per company error field for unresolved tickers

### Summary

Added `lib/types.ts` (`Filing`, `FilingsFile`) and `lib/loadCompanyFilings.ts` (ticker→CIK resolution, submissions + paginated files fetch, columnar normalization, sort desc). Refactored `features/filings/service.ts` to use the shared loader while keeping `createDocumentUrl`, form filter, and pagination local; `features/filings/types.ts` now imports `Filing` from lib. Implemented `features/summary/service.ts` with a per-ticker `summarizeTicker` that runs in parallel, counts filings in the last 12 months by form, and picks the latest 10-K from the sorted list. Extended `features/summary/types.ts` with a `CompanySummary` discriminated union (`CompanySummarySuccess | CompanySummaryError`) so unresolved tickers surface as a per-company `error` field instead of failing the batch.

---

### Context

assignment/quartr-data-tooling-coding-assignment.md (active), README.md, web/\*\*

### Prompt

Make a plan to create and scaffold a frontend that consumes the api. Create a Next.js project using the app router under a /web folder in the root of the project. Use npm and typescript. Use tailwind for css. It should have two routes with links from the root page, leave them empty to start with /filings and /summary. Create a .env and example file with the env var FILINGS_API_URL=http://localhost:3002. Update the readme with instructions on how to start this project also.

### Summary

Proposed a scaffold plan: run `create-next-app` at `web/` with TypeScript, Tailwind, App Router, npm, ESLint, `@/*` alias, and `--no-src-dir`; replace the default `app/page.tsx` with a minimal landing page linking to `/filings` and `/summary`; add empty `app/filings/page.tsx` and `app/summary/page.tsx` placeholders; write `web/.env` and `web/.env.example` containing `FILINGS_API_URL=http://localhost:3002` and ensure `.gitignore` tracks the example; update `app/layout.tsx` metadata and remove unused scaffold assets; extend the root `README.md` with a Web section (`npm install`, `cp .env.example .env`, `npm run dev`). Verification: `npm install`, `npm run dev`, link navigation, `npm run build`, `npm run lint`, and confirming API on port 3002 still runs. Flagged open decisions on Turbopack, Node version pinning, and import alias.

---

### Context

assignment/quartr-data-tooling-coding-assignment.md (active), README.md, web/\*\*

### Prompt

Start implementation

### Summary

Scaffolded `web/` via `create-next-app` (TS, Tailwind, App Router, npm, ESLint, Turbopack, `@/*` alias, no `src/`). Replaced default landing with a minimal home linking to `/filings` and `/summary` via `next/link`; added placeholder `app/filings/page.tsx` and `app/summary/page.tsx`. Updated `app/layout.tsx` metadata to "Quartr EDGAR". Added `web/.env` and `web/.env.example` with `FILINGS_API_URL=http://localhost:3002`, and adjusted `web/.gitignore` to keep `.env.example` tracked while ignoring other `.env*`. Removed scaffold noise (`web/AGENTS.md`, `web/CLAUDE.md`, unused SVGs in `web/public/`) and set `turbopack.root` in `web/next.config.ts` to silence the multi-lockfile warning. Extended root `README.md` with a Web section covering install, env copy, and dev server. Verified `npm run lint` and `npm run build` succeed with all four routes prerendered.

---

### Context

web/src/app/filings/page.tsx (active, `TickerInput` symbol)

### Prompt

Create the TickerInput component as input field using the companiesData for autocomplete suggestions. Use both the ticker and title fields. Show a list of maximum 5 matches below the input with the match highlighted, add a prop named onTickerSelect that gets triggered with the selected ticker.

### Summary

Added `web/src/components/TickerInput.tsx` as a client component exporting `Company` and `TickerInput`; filters the passed `companies` by case-insensitive substring match on `ticker` or `title`, caps suggestions at 5, and highlights the matched substring via `<mark>` in both fields. Calls `onTickerSelect(ticker)` on selection. Updated `web/src/app/filings/page.tsx` to fetch companies server-side, wire a `'use server'` `handleTickerSelect` that `redirect`s to `/filings?ticker=…`, and render the new `TickerInput`.

---

### Context

web/src/components/Filings.tsx (active, `useFilings` selection), web/src/lib/useFilings.ts, web/src/types/index.ts

### Prompt

Add a table showing the filings form the filingsData. Add a link for the documentUrl. Add simple next / previous pagination controls under the table also showing page number of total pages. Use useFilings for controling the pagination.

### Summary

Extended `web/src/components/Filings.tsx` to render a table of `filingsData.filings` (Form, Filing date, Report date, Description, Document) with `documentUrl` as an external link on `primaryDocument`. Added Previous/Next buttons wired to `useFilings.setPage`, disabled at bounds, with a "Page X of Y" label computed from `filingsData.total` and `pageSize`.

---

### Context

web/src/components/Filings.tsx (active), web/src/components/TickerInput.tsx, web/src/lib/useFilings.ts

### Prompt

- Prepopulate the ticker input with the current value if exists
- Add page size control to the pagination
- Reset the page number on ticker change or page size change

### Summary

Passed `initialValue={ticker}` to `TickerInput` in `web/src/components/Filings.tsx` to prepopulate from the URL. Added a page-size `<select>` (10/25/50/100) inside the pagination row wired to `setPageSize`. Refactored `web/src/lib/useFilings.ts` to update multiple search params atomically; `setTicker` and `setPageSize` now also clear `page` so pagination resets on ticker or page-size change.

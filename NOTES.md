# NOTES

## API missing from the assignment

- Allow date order sort control (sort query parameter) for the filings endpoint (now it's just descending)

## API next steps

- Error handling
- Health endpoint.
- Caching strategy (in memory + redis perhaps)
- Edgar rate limit, shared bucket for all calls with throttling
- Retry strategy
- Logging
- Tests
- CORS

## Web app missing from the assignment

- Filings page: add sort by filing date toggle (asc/desc). How: add a `sort` search param to `useFilings`, pass it to the API, and render a clickable date column header.
- Summary page: implement UI. Multi-select companies (reuse Ticker Input component). How: multi-select tickers synced to the URL, fetch `GET /filings/summary?tickers=...`, render a table of per-form counts and latest 10-K date per company.

## Web app next steps

- Improved UI/design
- Error handling
- Loading states
- Accessibility
- Tests
- Analytics
- Logging

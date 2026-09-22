import { Elysia, t } from 'elysia';

import { getFilingsSummary } from './service';

export const summaryRoutes = new Elysia().get(
  '/filings/summary',
  ({ query }) => {
    const tickers = query.tickers
      ? query.tickers
          .split(',')
          .map((ticker) => ticker.trim())
          .filter(Boolean)
      : [];

    return getFilingsSummary({ tickers });
  },
  {
    query: t.Object({
      tickers: t.Optional(t.String()),
    }),
  },
);

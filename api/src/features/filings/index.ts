import { Elysia, t } from 'elysia';

import { getFilings } from './service';

export const filingsRoutes = new Elysia().get(
  '/companies/:ticker/filings',
  ({ params, query }) =>
    getFilings({
      ticker: params.ticker,
      form: query.form,
      page: query.page,
      pageSize: query.pageSize,
    }),
  {
    params: t.Object({ ticker: t.String() }),
    query: t.Object({
      form: t.Optional(t.String()),
      page: t.Optional(t.Number()),
      pageSize: t.Optional(t.Number()),
    }),
  },
);

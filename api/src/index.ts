import { Elysia } from 'elysia';

import { filingsRoutes } from './features/filings';
import { summaryRoutes } from './features/summary';
import { companiesRoutes } from './features/companies';

const app = new Elysia()
  .use(filingsRoutes)
  .use(summaryRoutes)
  .use(companiesRoutes)
  .listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

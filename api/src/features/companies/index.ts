import { Elysia } from 'elysia';

import { fetchCompanies } from '../../lib/fetchCompanies';

export const companiesRoutes = new Elysia().get('/companies', () =>
  fetchCompanies(),
);

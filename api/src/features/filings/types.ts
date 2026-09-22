import type { Filing } from '../../lib/types';

export type FilingsQuery = {
  ticker: string;
  form?: string;
  page?: number;
  pageSize?: number;
};

export type FilingsResponse = {
  ticker: string;
  page: number;
  pageSize: number;
  total: number;
  filings: Filing[];
};

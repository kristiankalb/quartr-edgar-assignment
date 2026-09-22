'use client';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/config';
import { useRouter, useSearchParams } from 'next/navigation';

export type Filings = {
  ticker: string | undefined;
  form: string | undefined;
  page: number;
  pageSize: number;
  setTicker: (ticker: string | undefined) => void;
  setForm: (form: string | undefined) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useFilings = (): Filings => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ticker = searchParams.get('ticker') ?? undefined;
  const form = searchParams.get('form') ?? undefined;
  const pageInt = parseInt(searchParams.get('page') ?? '', 10);
  const page = Number.isInteger(pageInt) ? pageInt : DEFAULT_PAGE;
  const pageSizeInt = parseInt(searchParams.get('pageSize') ?? '', 10);
  const pageSize = Number.isInteger(pageSizeInt)
    ? pageSizeInt
    : DEFAULT_PAGE_SIZE;

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const queryString = params.toString();
    router.push(queryString === '' ? '?' : `?${queryString}`);
  };

  return {
    ticker,
    form,
    page,
    pageSize,
    setTicker: (nextTicker) =>
      updateParams({ ticker: nextTicker, page: String(DEFAULT_PAGE) }),
    setForm: (nextForm) =>
      updateParams({ form: nextForm, page: String(DEFAULT_PAGE) }),
    setPage: (nextPage) => updateParams({ page: String(nextPage) }),
    setPageSize: (nextPageSize) =>
      updateParams({
        pageSize: String(nextPageSize),
        page: String(DEFAULT_PAGE),
      }),
  };
};

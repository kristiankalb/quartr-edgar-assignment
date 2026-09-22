import { NotFoundError } from 'elysia';

import { fetchEdgarApi } from './fetchEdgarApi';
import { resolveTickerToCik } from './resolveTickerToCik';
import type { Filing, FilingsFile } from './types';

const BASE_URL = 'https://data.sec.gov/submissions/';

const normalizeFilings = (filings: Record<string, unknown[]>): Filing[] => {
  const keys = Object.keys(filings);
  const length = keys.length ? filings[keys[0]].length : 0;
  return Array.from({ length }, (_, index) =>
    Object.fromEntries(keys.map((key) => [key, filings[key][index]])),
  ) as Filing[];
};

const sortByFilingDateDesc = (a: Filing, b: Filing) => {
  return b.filingDate.localeCompare(a.filingDate);
};

const loadAllFilingFiles = async (paddedCik: string) => {
  const submissions = await fetchEdgarApi(`${BASE_URL}CIK${paddedCik}.json`);
  // TODO: Implement throttling if the number of files exceeds the SEC rate limit of 10 calls/sec
  const olderFileCalls = submissions.filings.files.map((file: FilingsFile) =>
    fetchEdgarApi(`${BASE_URL}${file.name}`),
  );
  const olderFiles = await Promise.all(olderFileCalls);
  return [submissions.filings.recent, ...olderFiles];
};

export const loadCompanyFilings = async (
  ticker: string,
): Promise<{ cik: number; filings: Filing[] }> => {
  const cik = await resolveTickerToCik(ticker);

  if (!cik) {
    // Ties the lib layer to elysia-specific errors, but keeps error handling simple across services.
    throw new NotFoundError(`Ticker ${ticker} not found`);
  }

  const paddedCik = cik.toString().padStart(10, '0');
  const filingFiles = await loadAllFilingFiles(paddedCik);
  const filings = filingFiles
    .flatMap((file) => normalizeFilings(file))
    .sort(sortByFilingDateDesc);

  return { cik, filings };
};

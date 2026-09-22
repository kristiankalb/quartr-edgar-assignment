import { fetchEdgarApi } from './fetchEdgarApi';

const COMPANY_TICKERS_URL = 'https://www.sec.gov/files/company_tickers.json';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

type CompanyTicker = {
  cik_str: number;
  ticker: string;
  title: string;
};

let cache: CompanyTicker[] | null = null;
let cacheTimestamp: number | null = null;

export const fetchCompanies = async (): Promise<CompanyTicker[]> => {
  const now = Date.now();
  if (cache && cacheTimestamp && now - cacheTimestamp < CACHE_TTL) return cache;
  const response = await fetchEdgarApi(COMPANY_TICKERS_URL);
  cacheTimestamp = now;
  cache = Object.values(response) as CompanyTicker[];
  return cache;
};

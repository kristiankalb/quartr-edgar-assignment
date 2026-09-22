import { fetchCompanies } from './fetchCompanies';

export const resolveTickerToCik = async (ticker: string) => {
  const companyTickers = await fetchCompanies();

  const companyTicker = companyTickers.find(
    (company) => company.ticker.toLowerCase() === ticker.toLowerCase(),
  );

  return companyTicker?.cik_str || null;
};

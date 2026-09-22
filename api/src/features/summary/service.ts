import { loadCompanyFilings } from '../../lib/loadCompanyFilings';
import type { Filing } from '../../lib/types';
import type { CompanySummary, FormTypeCount, SummaryQuery } from './types';

const TEN_K = '10-K';
const MONTH_PERIOD = 12;

const getCutoffDate = (numMonths: number) => {
  const cutoff = new Date();
  cutoff.setUTCMonth(cutoff.getUTCMonth() - numMonths);
  return cutoff.toISOString().slice(0, 10);
};

const countByForm = (filings: Filing[]): FormTypeCount[] => {
  const counts = filings.reduce((acc, filing) => {
    acc.set(filing.form, (acc.get(filing.form) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());
  return Array.from(counts, ([form, count]) => ({ form, count })).sort(
    (a, b) => b.count - a.count,
  );
};

const summarizeTicker = async (ticker: string): Promise<CompanySummary> => {
  try {
    const { filings } = await loadCompanyFilings(ticker);
    const cutoffDate = getCutoffDate(MONTH_PERIOD);
    const recentFilings = filings.filter(
      (filing) => filing.filingDate >= cutoffDate,
    );
    // `filings` is sorted by filingDate desc, so the first 10-K is the latest.
    const latest10K = filings.find((filing) => filing.form === TEN_K);

    return {
      ticker,
      countsByForm: countByForm(recentFilings),
      latest10KDate: latest10K?.filingDate ?? null,
    };
  } catch (error) {
    return {
      ticker,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getFilingsSummary = async (
  query: SummaryQuery,
): Promise<CompanySummary[]> => {
  const companies = await Promise.all(query.tickers.map(summarizeTicker));
  return companies;
};

import { loadCompanyFilings } from '../../lib/loadCompanyFilings';
import type { Filing } from '../../lib/types';
import type { FilingsQuery, FilingsResponse } from './types';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 100;

// EDGAR 7.0 launched 2000-05-26; earlier filings only have the flat text submission path.
const EDGAR_7_LAUNCH = '2000-05-26';

const createDocumentUrl = (cik: number, filing: Filing) => {
  const accessionNoDashes = filing.accessionNumber.replace(/-/g, '');
  const base = `https://www.sec.gov/Archives/edgar/data/${cik}`;

  if (filing.filingDate < EDGAR_7_LAUNCH) {
    return `${base}/${filing.accessionNumber}-index.html`;
  }

  return `${base}/${accessionNoDashes}/${filing.primaryDocument}`;
};

export const getFilings = async (
  query: FilingsQuery,
): Promise<FilingsResponse> => {
  const page = query.page && query.page > 0 ? query.page : DEFAULT_PAGE;
  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
  const form = query.form;

  const { cik, filings } = await loadCompanyFilings(query.ticker);

  const filingsWithDocUrl = filings.map((filing) => ({
    ...filing,
    documentUrl: createDocumentUrl(cik, filing),
  }));

  const filteredFilings = form
    ? filingsWithDocUrl.filter(
        (filing) => filing.form.toLowerCase() === form.toLowerCase(),
      )
    : filingsWithDocUrl;

  const paginatedFilings = filteredFilings.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return {
    ticker: query.ticker,
    page,
    pageSize,
    total: filteredFilings.length,
    filings: paginatedFilings,
  };
};

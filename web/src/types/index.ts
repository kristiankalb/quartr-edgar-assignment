export type Company = {
  cik_str: number;
  ticker: string;
  title: string;
};

export type Filing = {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  acceptanceDateTime: string;
  act: string;
  form: string;
  fileNumber: string;
  filmNumber: string;
  items: string;
  core_type: string;
  size: number;
  isXBRL: 0 | 1;
  isInlineXBRL: 0 | 1;
  isXBRLNumeric: 0 | 1 | null;
  primaryDocument: string;
  primaryDocDescription: string;
  documentUrl: string;
};

export type FilingsResponse = {
  ticker: string;
  page: number;
  pageSize: number;
  total: number;
  filings: Filing[];
};

export type FormTypeCount = {
  form: string;
  count: number;
};

export type CompanySummarySuccess = {
  ticker: string;
  countsByForm: FormTypeCount[];
  latest10KDate: string | null;
};

export type CompanySummaryError = {
  ticker: string;
  error: string;
};

export type CompanySummary = CompanySummarySuccess | CompanySummaryError;

export type SummaryQuery = {
  tickers: string[];
};

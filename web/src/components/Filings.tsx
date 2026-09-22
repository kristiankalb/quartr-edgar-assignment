'use client';

import { Company, FilingsResponse } from '@/types';
import { TickerInput } from './TickerInput';
import { useFilings } from '@/lib/useFilings';
import { FormFilter } from './FormFilter';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const Filings = ({
  companiesData,
  filingsData,
}: {
  companiesData: Company[];
  filingsData: FilingsResponse | null;
}) => {
  const {
    ticker,
    form,
    page,
    pageSize,
    setTicker,
    setForm,
    setPage,
    setPageSize,
  } = useFilings();

  const totalPages = filingsData
    ? Math.max(1, Math.ceil(filingsData.total / pageSize))
    : 1;
  const canGoPrevious = page > 1;
  const canGoNext = filingsData ? page < totalPages : false;

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Filings</h1>
      <TickerInput
        companies={companiesData}
        initialValue={ticker}
        onTickerSelect={setTicker}
      />
      <FormFilter form={form} setForm={setForm} />
      {ticker && !filingsData && <p>No filings for {ticker}...</p>}
      {filingsData && filingsData.filings.length > 0 && (
        <div className="flex w-full max-w-5xl flex-col gap-4">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-3 py-2 font-semibold">Form</th>
                <th className="px-3 py-2 font-semibold">Filing date</th>
                <th className="px-3 py-2 font-semibold">Report date</th>
                <th className="px-3 py-2 font-semibold">Description</th>
                <th className="px-3 py-2 font-semibold">Document</th>
              </tr>
            </thead>
            <tbody>
              {filingsData.filings.map((filing) => (
                <tr
                  key={filing.accessionNumber}
                  className="border-b border-gray-200"
                >
                  <td className="px-3 py-2">{filing.form}</td>
                  <td className="px-3 py-2">{filing.filingDate}</td>
                  <td className="px-3 py-2">{filing.reportDate}</td>
                  <td className="px-3 py-2">{filing.primaryDocDescription}</td>
                  <td className="px-3 py-2">
                    <a
                      href={filing.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {filing.primaryDocument}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={!canGoPrevious}
              className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <label className="flex items-center gap-2">
              <span>Page size</span>
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="rounded border border-gray-300 px-2 py-1"
              >
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={!canGoNext}
              className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import { Filings } from '@/components/Filings';
import { fetchFilingsApi } from '@/lib/fetchFilingsApi';
import { SearchParamsProp } from '@/lib/SearchParamsProp';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/config';
import { Company, FilingsResponse } from '@/types';

type PageProps = {
  searchParams: SearchParamsProp;
};

export default async function FilingsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { ticker, form, page, pageSize } = resolvedSearchParams;

  const companiesData = (await fetchFilingsApi('companies')) as Company[];

  const filingsData = ticker
    ? ((await fetchFilingsApi(
        `companies/${ticker}/filings?page=${page ?? DEFAULT_PAGE}&pageSize=${pageSize ?? DEFAULT_PAGE_SIZE}${form ? `&form=${form}` : ''}`,
      )) as FilingsResponse)
    : null;

  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-8">
      <Filings companiesData={companiesData} filingsData={filingsData} />
    </main>
  );
}

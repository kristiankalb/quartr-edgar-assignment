export const fetchFilingsApi = async (path: string) => {
  console.log(`Fetching filings from path: ${path}`);
  if (process.env.FILINGS_API_URL === undefined) {
    throw new Error('FILINGS_API_URL environment variable is not defined');
  }
  const response = await fetch(`${process.env.FILINGS_API_URL}/${path}`);
  if (!response.ok) {
    // TODO: Add error handling
    return null;
  }
  return response.json();
};

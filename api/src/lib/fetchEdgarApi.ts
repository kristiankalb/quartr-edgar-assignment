export const fetchEdgarApi = async (url: string) => {
  const userAgent = process.env.EDGAR_USER_AGENT;

  if (!userAgent) {
    throw new Error('EDGAR_USER_AGENT is not set. See .env-example.');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    if (!response.ok) {
      throw new Error(
        `EDGAR request failed: ${response.status} ${response.statusText}`,
      );
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(`Failed to fetch Edgar API: ${error}`);
  }
};

const THROTTLE_MS = 100;
let nextAvailableAt = 0;

const throttle = async () => {
  const now = Date.now();
  const runAt = Math.max(now, nextAvailableAt);
  nextAvailableAt = runAt + THROTTLE_MS;

  const wait = runAt - now;
  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
};

export const fetchEdgarApi = async (url: string) => {
  const userAgent = process.env.EDGAR_USER_AGENT;

  if (!userAgent) {
    throw new Error('EDGAR_USER_AGENT is not set. See .env-example.');
  }

  await throttle();

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

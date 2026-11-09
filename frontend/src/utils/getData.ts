const baseUrl = window.location.hostname;
const port = 4000;
async function getData<T>(path: string): Promise<T> {
  const requestUrl = `http://${baseUrl}:${port}${path}`;
  console.log(requestUrl);
  try {
    const startTick = Date.now();
    const response = await fetch(requestUrl);
    console.log(
      `${requestUrl} responded with HTTP ${response.status} after ${Date.now() - startTick} ms`,
    );
    if (!response.ok) {
      throw new Error(
        `Request to ${requestUrl} failed: HTTP ${response.status}`,
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(`Error while sending request to ${requestUrl}: ${err}`);
  }
}

export default getData;

import { ApiResponse } from '@/types/utils.type';

/**
 * Makes a fetch request to the specified URL with optional options.
 *
 * @param url - The URL to make the fetch request to.
 * @param options - Optional fetch options.
 * @returns An object containing the response, status, and error.
 */
async function useFetch(
  url: string,
  options?: RequestInit
): Promise<{
  response: ApiResponse | null;
  status: number | null;
  // error: Error | null | unknown | string;
}> {
  let response: ApiResponse = { error: 'Something went wrong! Please try again' };
  let status: number | null = null;
  try {
    const fetchResponse = await fetch(url, options);

    const responseBody: ApiResponse = (await fetchResponse.json()) as ApiResponse;
    status = fetchResponse.status;
    response = responseBody;
  } catch (error) {
    response.error = 'Something went wrong! Please try again';
  }

  return { response, status };
}

export default useFetch;

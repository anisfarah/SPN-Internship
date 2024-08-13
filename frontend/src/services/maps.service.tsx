import useFetch from '@/hooks/useFetch';

/**
 * Fetches location details for a given place ID.
 *
 * @param placeId - The ID of the place to fetch details for.
 * @returns The response from the fetch call.
 */
const GetLocationDetails = async (placeId: string) => {
  const response = await useFetch(
    `http://localhost:4000/api/maps/getLocationDetails/?id=${placeId}`,
    { method: 'GET' }
  );
  if (response.status !== 200) {
    // console.error('Error fetching data:', response);
    return Error;
  }

  return response;
};

/**
 * Fetches location autocomplete suggestions for a given location string.
 *
 * @param location - The location string to get autocomplete suggestions for.
 * @returns The response from the fetch call.
 */
const GetLocationsAutoComplete = async (location: string) => {
  const response = await useFetch(
    `http://localhost:4000/api/maps/getLocationAutocomplete/?location=${location}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    return Error;
  }

  return response;
};

export default GetLocationsAutoComplete;
export { GetLocationDetails };

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch location details from the Google Maps API.
 *
 * @param req - The incoming request object.
 * @returns A NextResponse with the location details or an error message.
 */
export async function GET(req: Request): Promise<NextResponse> {
  // Extract place ID from the request URL
  const url = new URL(req.url);
  const placeId = url.searchParams.get('id');

  if (!placeId) {
    return NextResponse.json({ error: 'Missing place ID in the request.' }, { status: 400 });
  }

  try {
    // Fetch location details from Google Maps API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&result_type=locality|country|street_address&key=${process.env.GMAPS_API_KEY}`,
      {
        method: 'GET'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Maps API');
    }

    const jsonResponse: any = await response.json();
    const addressComponents = jsonResponse.result.address_components;

    // Filter address components for city and country information
    const cities = addressComponents.filter((component: any) =>
      component.types.includes('political')
    );
    const countries = addressComponents.filter((component: any) =>
      component.types.includes('country')
    );

    if (cities.length === 0 || countries.length === 0) {
      return NextResponse.json(
        { error: 'Unable to find city or country information.' },
        { status: 404 }
      );
    }

    // Extract relevant data from the response
    const locationData = {
      city: cities[0]?.long_name,
      country: countries[0]?.long_name,
      label: jsonResponse.result.name,
      longitude: jsonResponse.result.geometry.location.lng,
      latitude: jsonResponse.result.geometry.location.lat
    };

    return NextResponse.json({ data: locationData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch location autocomplete suggestions from the Google Maps API.
 *
 * @param req - The incoming request object.
 * @returns A NextResponse with the autocomplete predictions or an error message.
 */
export async function GET(req: Request): Promise<NextResponse> {
  // Extract location query parameter from the request URL
  const url = new URL(req.url);
  const location = url.searchParams.get('location');

  if (!location) {
    return NextResponse.json(
      { error: 'Missing location query parameter in the request.' },
      { status: 400 }
    );
  }

  try {
    // Fetch location autocomplete suggestions from Google Maps API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&language=en&location=46.20393896425156%2C6.142695527255839&radius=50000&key=${process.env.GMAPS_API_KEY}`,
      {
        method: 'GET'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Maps API');
    }

    const result: any = await response.json();
    // console.log('🚀 ~ GET ~ result:', result);

    if (result.status !== 'OK') {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    // Return the autocomplete predictions
    return NextResponse.json({ predictions: result.predictions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

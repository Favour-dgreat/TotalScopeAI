// app/api/subscribe/route.ts
import { NextResponse, NextRequest } from 'next/server'; // Import NextResponse and NextRequest
import axios from 'axios';

export async function POST(request: NextRequest) { // Use 'request' parameter with NextRequest type
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoListId = process.env.BREVO_LIST_ID;

  if (!brevoApiKey || !brevoListId) {
    console.error('Brevo API Key or List ID not set in environment variables.');
    return NextResponse.json(
      { message: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json(); // Get JSON body from the request object

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email is required.' },
        { status: 400 }
      );
    }

    const brevoApiUrl = 'https://api.brevo.com/v3/contacts'; // Brevo API endpoint for contacts

    const data = {
      email: email,
      listIds: [parseInt(brevoListId)], // List IDs should be integers
      updateEnabled: true, // If the contact already exists, update their attributes/lists
    };

    const headers = {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await axios.post(brevoApiUrl, data, { headers });

    if (response.status === 201 || response.status === 204) {
      return NextResponse.json(
        { message: 'Subscription successful!' },
        { status: 200 }
      );
    } else {
      console.error('Unexpected Brevo API response status:', response.status, response.data);
      return NextResponse.json(
        { message: 'Failed to subscribe (unexpected Brevo response).' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Brevo API Error:', error.response?.data || error.message);

    if (error.response && error.response.status === 400) {
      if (error.response.data.message && error.response.data.message.includes('already exists')) {
        return NextResponse.json(
          { message: 'This email is already subscribed.' },
          { status: 409 } // 409 Conflict
        );
      }
    }
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

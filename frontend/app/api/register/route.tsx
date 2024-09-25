import { NextResponse } from 'next/server';
import { TEKK_APP_API_URL } from '../../config';

export async function POST(request: Request) {
  try {
    const playerInfo = await request.json();
    console.log('Registration attempt for email:', playerInfo.email);

    const response = await fetch(`${TEKK_APP_API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerInfo),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', data);

    if (response.ok) {
      console.log('Registration successful');
      return NextResponse.json(data);
    } else {
      console.error('Registration failed:', data.detail);
      return NextResponse.json({ error: data.detail }, { status: response.status });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
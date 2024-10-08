import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Registration attempt for email:', email);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Backend response status:', response.status);
    let data;
    try {
      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      data = JSON.parse(textResponse);
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return NextResponse.json({ error: 'Invalid response from server' }, { status: 500 });
    }
    console.log('Backend response data:', data);

    if (response.ok && data && data.uid) {
      console.log('Registration successful');
      return NextResponse.json({ message: 'Registration successful', uid: data.uid });
    } else {
      console.error('Registration failed:', data.error || 'Unknown error');
      return NextResponse.json({ error: data.error || 'Registration failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
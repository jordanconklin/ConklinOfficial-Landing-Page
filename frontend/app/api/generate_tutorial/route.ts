import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TEKK_APP_API_URL } from '../../config';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { prompt, session_id } = await request.json();

    const response = await fetch(`${TEKK_APP_API_URL}/generate_tutorial/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt, session_id }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Failed to generate tutorial' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error generating tutorial:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
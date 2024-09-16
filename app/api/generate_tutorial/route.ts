import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, session_id } = await request.json();

    const response = await fetch('http://127.0.0.1:8000/generate_tutorial/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
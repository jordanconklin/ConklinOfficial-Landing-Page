import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_TEKK_API_URL}/get_previous_conversations/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Failed to fetch previous conversations' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching previous conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
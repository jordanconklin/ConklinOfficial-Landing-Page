import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TEKK_APP_API_URL } from '../../config';

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await fetch(`${TEKK_APP_API_URL}/conversations/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail || 'Failed to create new conversation' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
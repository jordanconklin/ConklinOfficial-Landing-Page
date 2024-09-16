import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch('http://127.0.0.1:8000/conversations/new', {
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Failed to create new conversation' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
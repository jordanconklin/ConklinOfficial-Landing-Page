import { NextRequest, NextResponse } from 'next/server';
import { SPRING_APP_API_URL } from '../../config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const response = await fetch(`${SPRING_APP_API_URL}/api/payment/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', response.status, errorText);
      return NextResponse.json({ error: `Server error: ${errorText}` }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Error creating payment intent: ${errorMessage}` }, { status: 500 });
  }
}
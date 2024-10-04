import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    console.log('API URL:', process.env.NEXT_PUBLIC_SPRING_API_URL);
    console.log('Full URL:', `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/payment/create-payment-intent`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/payment/create-payment-intent`, {
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
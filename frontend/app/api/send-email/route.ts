
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { name, email, message } = await request.json();

//     const response = await fetch('http://localhost:8080/api/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, message, to: 'conklinofficialsoccer@gmail.com' }),
//     });

//     if (response.ok) {
//       return NextResponse.json({ message: 'Email sent successfully' });
//     } else {
//       return NextResponse.json({ error: 'Failed to send email' }, { status: response.status });
//     }
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';

const products = [
  { id: '1', name: 'ConklinOfficial Quarter Zip Pullover', price: 65.00, image: '/quarter-zip.jpg' },
  { id: '2', name: 'ConklinOfficial Midweight Hoodie', price: 26.00, image: '/midweight-hoodie.jpg' },
  { id: '3', name: 'ConklinOfficial Champion T-Shirt', price: 25.00, image: '/champion-tshirt.jpg' },
  { id: '4', name: 'ConklinOfficial Classic T-Shirt', price: 16.00, image: '/classic-tshirt.jpg' },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
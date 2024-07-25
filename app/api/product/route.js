import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(request) {
  let body = await request.json();
  try {
    const client = await clientPromise;
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const product = await inventory.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function DELETE(request) {
  const { slug } = await request.json();
  try {
    const client = await clientPromise;
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const result = await inventory.deleteOne({ slug });
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

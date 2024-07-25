import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb+srv://kumarsanyam2003:vu8hN98MzzfaXn2Z@cluster0.gvacucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the client is not
  // repeatedly created on hot reloading
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, use a local variable
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  clientPromise = client.connect();
}

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

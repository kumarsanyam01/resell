import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  console.log('Received query:', query); // Log the received query

  const uri = "mongodb+srv://kumarsanyam2003:vu8hN98MzzfaXn2Z@cluster0.gvacucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');

    const products = await inventory.aggregate([
      {
        $match: {
          slug: { $regex: query, $options: "i" }
        }
      }
    ]).toArray();

    console.log('Query results:', products); // Log the query results
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}

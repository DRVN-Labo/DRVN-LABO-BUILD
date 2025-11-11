import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

// Handle other methods if needed
export async function GET() {
  return NextResponse.json({ message: "Catch-all route" });
}

export async function POST() {
  return NextResponse.json({ message: "Catch-all route" });
}

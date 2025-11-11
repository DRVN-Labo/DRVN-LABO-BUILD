import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const body = await request.json();
    const { username, walletAddress } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
      walletAddress: { $ne: walletAddress?.toLowerCase() },
    });

    return NextResponse.json(
      {
        available: !existingUser,
        username: username.toLowerCase(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Username check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

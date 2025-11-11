import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const body = await request.json();
    const { walletAddress } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 },
      );
    }

    // Validate wallet address format (basic Ethereum address validation)
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletRegex.test(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 },
      );
    }

    // Find user by wallet address
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data for editing (no encryption/decryption needed)
    const editableUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      xHandle: user.xHandle,
      profileImage: user.profileImage || "/Cars/UserImage.png",
      walletAddress: user.walletAddress,
      bio: user.bio,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        success: true,
        user: editableUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("User edit fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

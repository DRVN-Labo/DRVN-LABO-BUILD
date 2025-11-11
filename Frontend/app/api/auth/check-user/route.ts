import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../lib/models/User";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // Check if user exists in database
    const existingUser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    return NextResponse.json({
      exists: !!existingUser,
      user: existingUser
        ? {
            _id: existingUser._id,
            username: existingUser.username,
            firstName: existingUser.firstName
              ? existingUser.firstName.substring(0, 2) + "***"
              : "***",
            lastName: existingUser.lastName
              ? existingUser.lastName.substring(0, 2) + "***"
              : "***",
            email: existingUser.email
              ? existingUser.email.substring(0, 2) + "***"
              : "***",
            profileImage: existingUser.profileImage || "/Cars/UserImage.png",
            walletAddress: existingUser.walletAddress,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json(
      { error: "Failed to check user existence" },
      { status: 500 },
    );
  }
}

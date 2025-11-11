import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const body = await request.json();
    const { walletAddress, username, profileImage, firstName, lastName, bio } =
      body;

    console.log("Update user request:", {
      walletAddress,
      username,
      profileImage,
      firstName,
      lastName,
      bio,
    });

    // Validate required fields
    if (!walletAddress || !username) {
      return NextResponse.json(
        { error: "Wallet address and username are required" },
        { status: 400 },
      );
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          error: "Username can only contain letters, numbers, and underscores",
        },
        { status: 400 },
      );
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3 and 20 characters" },
        { status: 400 },
      );
    }

    // Check if username is already taken
    const existingUserWithUsername = await User.findOne({
      username: username.toLowerCase(),
      walletAddress: { $ne: walletAddress.toLowerCase() },
    });

    if (existingUserWithUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }

    // Update user - use updateOne with $set to ensure bio field is saved
    const updateData = {
      username: username.toLowerCase(),
      profileImage: profileImage || "",
      firstName: firstName || "",
      lastName: lastName || "",
      updatedAt: new Date(),
    };

    console.log("Update data being sent to database:", updateData);
    console.log("Bio value specifically:", bio);
    console.log("Bio value after ||:", bio || "");

    // First update the main fields
    const updatedUser = await User.updateOne(
      { walletAddress: walletAddress.toLowerCase() },
      { $set: updateData },
    );

    if (!updatedUser.modifiedCount) {
      console.log("No documents were modified in first update");
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    console.log("First update result:", updatedUser);

    // Now explicitly add/update the bio field
    console.log("Attempting to update bio field specifically...");
    const bioUpdate = await User.updateOne(
      { walletAddress: walletAddress.toLowerCase() },
      { $set: { bio: bio || "" } },
    );

    console.log("Bio update result:", bioUpdate);

    // Fetch the updated user to return
    const finalUser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    }).select(
      "firstName lastName username email xHandle profileImage walletAddress bio createdAt updatedAt",
    );

    if (!finalUser) {
      return NextResponse.json(
        { error: "Failed to fetch updated user" },
        { status: 500 },
      );
    }

    console.log("Final updated user in database:", finalUser);
    console.log("Bio field in final user:", finalUser.bio);
    console.log("Bio field type:", typeof finalUser.bio);
    console.log("All fields in final user:", Object.keys(finalUser.toObject()));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: {
          id: finalUser._id,
          firstName: finalUser.firstName,
          lastName: finalUser.lastName,
          username: finalUser.username,
          email: finalUser.email,
          xHandle: finalUser.xHandle,
          profileImage: finalUser.profileImage,
          walletAddress: finalUser.walletAddress,
          bio: finalUser.bio,
          createdAt: finalUser.createdAt,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

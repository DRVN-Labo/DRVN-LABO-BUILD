import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Force schema update by ensuring bio field exists
    if (!User.schema.paths.bio) {
      User.schema.add({
        bio: {
          type: String,
          default: "",
          maxlength: [500, "Bio must be less than 500 characters"],
        },
      });
    }

    // Get request body
    const body = await request.json();
    const {
      firstName,
      lastName,
      username,
      email,
      xHandle,
      profileImage,
      walletAddress,
      bio,
    } = body;

    // Processing signup data...

    // Validate required fields
    if (!firstName || !lastName || !username || !email || !walletAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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

    // Validate wallet address format (basic Ethereum address validation)
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletRegex.test(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
        { walletAddress: walletAddress.toLowerCase() },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 },
        );
      }
      if (existingUser.username === username.toLowerCase()) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 },
        );
      }
      if (existingUser.walletAddress === walletAddress.toLowerCase()) {
        return NextResponse.json(
          { error: "User with this wallet address already exists" },
          { status: 409 },
        );
      }
    }

    // Create new user
    const userData = {
      firstName,
      lastName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      xHandle: xHandle || "",
      profileImage: profileImage || "",
      walletAddress: walletAddress.toLowerCase(),
      bio: bio || "", // Add bio field
    };

    const user = new User(userData);
    await user.save();

    // Return success response with user data
    const safeUser = {
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
        message: "User registered successfully",
        user: safeUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

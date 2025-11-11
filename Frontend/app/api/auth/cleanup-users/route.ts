import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function DELETE() {
  try {
    await dbConnect();

    // Delete all users
    const result = await User.deleteMany({});

    console.log(`Deleted ${result.deletedCount} users from database`);

    return NextResponse.json(
      {
        success: true,
        message: `Deleted ${result.deletedCount} users from database`,
        deletedCount: result.deletedCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

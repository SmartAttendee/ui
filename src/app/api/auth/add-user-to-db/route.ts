import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/connectDb";
import User from "@/models/user.models";

export async function POST(request: NextRequest) {
  try {
    connectDB();

    const requestBody = await request.json();
    const {
      clerkId,
      email,
      username,
      phoneNumber,
      avatar,
      organizationName,
      role,
    } = requestBody;

    if (
      [clerkId, email, username, phoneNumber, avatar, organizationName].some(
        (field) => !field
      )
    ) {
      return NextResponse.json(
        { message: "Please provide all the fields", success: false },
        { status: 400 }
      );
    }

    let user;
    user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        username,
        phoneNumber,
        avatar,
        organizationName,
        role: role || "Employee",
      });
    }

    return NextResponse.json(
      {
        message: `User with clerkId ${clerkId} has been successfully added to database.`,
        data: user,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

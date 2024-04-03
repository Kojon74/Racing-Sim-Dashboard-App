import User from "@/app/(models)/User";
import { NextResponse, NextRequest } from "next/server";

// Get all users
export const GET = async (req: NextRequest) => {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// Create a user
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    User.create({
      name: data.name,
      lastOnline: new Date(),
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

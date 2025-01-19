import User from "@/app/(models)/User";
import { NextResponse, NextRequest } from "next/server";

// Get user by username
export const GET = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const username = params.username;

  try {
    const user = await User.findOne({ username });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// Update user
export const PUT = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const username = params.username;
  try {
    User.findOneAndUpdate({ username }, { lastOnline: new Date() });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

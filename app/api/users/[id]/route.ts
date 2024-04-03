import User from "@/app/(models)/User";
import { NextRequest, NextResponse } from "next/server";

// Update user
export const PUT = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const id = params.id;
  try {
    User.findByIdAndUpdate(id, { lastOnline: new Date() });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

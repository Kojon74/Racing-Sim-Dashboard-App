import Circuit from "@/app/(models)/Circuit";
import { NextResponse, NextRequest } from "next/server";

// Get all circuits
export const GET = async (req: NextRequest) => {
  try {
    const circuits = await Circuit.find();
    console.log(circuits);

    return NextResponse.json({ circuits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// Create a track
export const POST = async (req: NextRequest) => {
  try {
    const newTrack = Circuit.create(req.json());
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

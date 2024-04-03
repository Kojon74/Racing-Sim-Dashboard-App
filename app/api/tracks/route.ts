import Track from "@/app/(models)/Track";
import { NextResponse, NextRequest } from "next/server";

// Get all tracks
export const GET = async (req: NextRequest) => {
  try {
    const tracks = await Track.find();
    return NextResponse.json({ tracks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// Create a track
export const POST = async (req: NextRequest) => {
  try {
    const newTrack = Track.create(req.json());
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

import Track from "@/app/(models)/Track";
import { NextResponse, NextRequest } from "next/server";

// Get track matching track-name
export const GET = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const acName = params.acName;
  try {
    const track = await Track.findOne({ acName });
    return NextResponse.json({ track }, { status: 200 });
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

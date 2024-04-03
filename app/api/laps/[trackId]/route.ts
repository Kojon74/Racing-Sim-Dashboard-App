import { NextResponse, NextRequest } from "next/server";
import Lap from "@/app/(models)/Lap";

// Get all laps matching track
export const GET = async (
  req: NextRequest,
  { params }: { params: { trackId: string } }
) => {
  const { trackId } = params;
  try {
    const laps = await Lap.find({ track: trackId }).sort("lapTime");
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

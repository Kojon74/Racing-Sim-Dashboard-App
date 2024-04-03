import Lap from "@/app/(models)/Lap";
import { NextRequest, NextResponse } from "next/server";

// Get track matching track-name
export const GET = async (req: NextRequest, { params }) => {
  const { trackId, userId } = params;

  try {
    const bestLap = await Lap.findOne({
      track: trackId,
      "user.id": userId,
    }).sort("lapTime");

    return NextResponse.json({ bestLap }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

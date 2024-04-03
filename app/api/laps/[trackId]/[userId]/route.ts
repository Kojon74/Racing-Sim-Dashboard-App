import Lap from "@/app/(models)/Lap";
import { NextResponse, NextRequest } from "next/server";

// Get all laps matching track and user
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const trackId = searchParams.get("trackId");
  const userId = searchParams.get("userId");
  try {
    const laps = await Lap.find({ trackId, userId });
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

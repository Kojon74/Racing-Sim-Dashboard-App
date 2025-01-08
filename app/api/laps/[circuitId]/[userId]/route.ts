import Lap from "@/app/(models)/Lap";
import { NextResponse, NextRequest } from "next/server";

// Get all laps matching circuit and user
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const circuitId = searchParams.get("circuitId");
  const userId = searchParams.get("userId");
  try {
    const laps = await Lap.find({ circuitId, userId });
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

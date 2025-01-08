import Lap from "@/app/(models)/Lap";
import { NextRequest, NextResponse } from "next/server";

// Upload a lap
export const POST = async (req: NextRequest) => {
  try {
    const { lapTime, circuit, user, sectorTimes, timestamp } = await req.json();
    const newLap = Lap.create({
      lapTime,
      circuit,
      user,
      sectorTimes,
      date: new Date(timestamp),
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

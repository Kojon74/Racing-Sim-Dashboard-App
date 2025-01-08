import Lap from "@/app/(models)/Lap";
import { NextRequest, NextResponse } from "next/server";

// Get circuit matching circuit-name
export const GET = async (req: NextRequest, { params }) => {
  const { circuitId, userId } = params;

  try {
    const bestLap = await Lap.findOne({
      circuit: circuitId,
      "user.id": userId,
    }).sort("lapTime");

    return NextResponse.json({ bestLap }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

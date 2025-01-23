import Lap from "@/app/(models)/Lap";
import { Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Get circuit matching circuit-name
// Might have to change params type
export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { circuitId: Schema.Types.ObjectId; userId: Schema.Types.ObjectId };
  }
) => {
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

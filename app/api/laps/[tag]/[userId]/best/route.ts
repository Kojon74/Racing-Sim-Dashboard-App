import Circuit from "@/app/(models)/Circuit";
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
    params: { tag: Schema.Types.ObjectId; userId: Schema.Types.ObjectId };
  }
) => {
  try {
    const circuit = await Circuit.findOne({ tag: params.tag });
    const bestLap = await Lap.findOne({
      circuit: circuit._id,
      "user.id": params.userId,
    }).sort("lapTime");

    return NextResponse.json({ bestLap }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

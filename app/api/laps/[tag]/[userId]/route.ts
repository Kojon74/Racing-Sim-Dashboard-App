import Circuit from "@/app/(models)/Circuit";
import Lap from "@/app/(models)/Lap";
import { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

// Get all laps matching circuit and user
export const GET = async (
  req: NextRequest,
  { params }: { params: { tag: string; userId: Schema.Types.ObjectId } }
) => {
  try {
    const circuit = await Circuit.findOne({ tag: params.tag });
    const laps = await Lap.find({
      circuit: circuit._id,
      "user.id": params.userId,
    });
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

import { NextResponse, NextRequest } from "next/server";
import Lap from "@/app/(models)/Lap";
import Circuit from "@/app/(models)/Circuit";

// Get all laps matching circuit
export const GET = async (
  req: NextRequest,
  { params }: { params: { tag: string } }
) => {
  const { tag } = params;
  try {
    const circuit = await Circuit.findOne({ tag });
    const laps = await Lap.find({ circuit: circuit._id }).sort("lapTime");
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

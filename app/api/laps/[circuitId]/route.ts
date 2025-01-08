import { NextResponse, NextRequest } from "next/server";
import Lap from "@/app/(models)/Lap";

// Get all laps matching circuit
export const GET = async (
  req: NextRequest,
  { params }: { params: { circuitId: string } }
) => {
  const { circuitId } = params;
  try {
    const laps = await Lap.find({ circuit: circuitId }).sort("lapTime");
    return NextResponse.json({ laps }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

import Circuit from "@/app/(models)/Circuit";
import { NextResponse, NextRequest } from "next/server";

// Get circuit matching circuit-name
export const GET = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const grandPrix = params.acName;
  console.log(grandPrix);

  try {
    const circuit = await Circuit.findOne({ grandPrix });
    return NextResponse.json({ circuit }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// Create a circuit
export const POST = async (req: NextRequest) => {
  try {
    const newCircuit = Circuit.create(req.json());
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

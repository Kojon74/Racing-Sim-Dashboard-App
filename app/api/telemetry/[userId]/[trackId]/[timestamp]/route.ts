import { storage } from "@/app/utils/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  try {
    const { userId, trackId, timestamp } = params;
    const telemetryUrl = await getDownloadURL(
      ref(storage, `${userId}/${trackId}/${timestamp}.csv`)
    );
    const telemetry = await (await fetch(telemetryUrl)).text();
    return NextResponse.json({ telemetry }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) => {
  const { userId, trackId, timestamp } = params;
  try {
    const telemetry = await req.text();
    uploadString(
      ref(storage, `${userId}/${trackId}/${timestamp}.csv`),
      telemetry
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

import { NextResponse } from "next/server";
import Project from "../../(models)/Project";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const projectData = body.formData;
    console.log(projectData);

    await Project.create(projectData);
    return NextResponse.json({ message: "Project Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const projects = await Project.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

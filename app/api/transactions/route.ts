import { NextResponse } from "next/server";
import { getAll, add } from "./db";

export async function GET() {
  try {
    const data = getAll();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body) return NextResponse.json({ message: "invalid body" }, { status: 400 });
    const created = add(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { removeById, updateById } from "../db";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    removeById(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await request.json();
    const updated = updateById(params.id, patch);
    if (!updated) return NextResponse.json({ message: "not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

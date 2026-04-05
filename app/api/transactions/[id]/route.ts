import { NextResponse } from "next/server";
import { removeById, updateById } from "../db";

// In some Next.js/TS environments the `context.params` may be a Promise.
// Accept either shape and await `params` to normalize the value.
export async function DELETE(_request: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const params = await (context as any).params;
    removeById(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const params = await (context as any).params;
    const patch = await request.json();
    const updated = updateById(params.id, patch);
    if (!updated) return NextResponse.json({ message: "not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}

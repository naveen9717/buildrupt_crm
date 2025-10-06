import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { photoId } = await params;

  try {
    // Query 1: Main shoot details
    const photoResult = await db.query("SELECT * FROM photo WHERE id = ?", [
      photoId,
    ]);

    return NextResponse.json({
      photos: photoResult[0] || null,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await db.query("DELETE FROM deliverables WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const { photoId } = await params;
  const body = await request.json();

  const { form } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE photo SET name = ?, half = ?, full = ?, halffull = ?, status = ?  WHERE id = ?`,
      [form.name, form.half, form.full, form.halffull, form.status, photoId]
    );

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

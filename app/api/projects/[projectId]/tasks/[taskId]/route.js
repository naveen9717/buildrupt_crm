import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { taskId } = await params;

  try {
    // Query 1: Main shoot details
    const shootResult = await db.query("SELECT * FROM tasks WHERE id = ?", [
      taskId,
    ]);

    return NextResponse.json({
      task: shootResult[0] || null,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await db.query("DELETE FROM shoots WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const { taskId } = await params;
  const body = await request.json();

  const { form } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE tasks SET assigned = ?, date = ?, priority = ?, status = ?, notes = ? WHERE id = ?`,
      [form.assigned, form.date, form.priority, form.status, form.notes, taskId]
    );

    // ✅ Update notification (instead of inserting)

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

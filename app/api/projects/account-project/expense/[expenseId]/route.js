import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { expenseId } = await params;
  try {
    // Query 1: Main shoot details
    const shootResult = await db.query("SELECT * FROM expenses WHERE id = ? ", [
      expenseId,
    ]);

    return NextResponse.json({
      expense: shootResult[0] || null,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await db.query("DELETE FROM expenses WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const { expenseId } = await params;

  const body = await request.json();

  const { form, member_id } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE expenses SET event = ?, photo_id = ?,billed = ?, category = ?, amount = ?, date = ?, descriptions = ?, notes = ? WHERE id = ?`,
      [
        form.event,
        form.photo_id,
        form.billed,
        form.category,
        form.amount,
        form.date,
        form.descriptions,
        form.notes,
        expenseId,
      ]
    );

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

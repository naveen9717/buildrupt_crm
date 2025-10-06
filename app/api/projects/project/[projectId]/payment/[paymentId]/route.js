import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { paymentId } = await params;
  try {
    // Query 1: Main shoot details
    const paymentResult = await db.query(
      "SELECT * FROM amounts WHERE id = ? ",
      [paymentId]
    );

    return NextResponse.json({
      payment: paymentResult[0] || null,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await db.query("DELETE FROM amounts WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const { paymentId } = await params;

  const body = await request.json();

  const { form } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE amounts SET status = ?, amount = ?, payment_mode = ?, description = ?, due_date = ?, paid_date = ?, notes = ? WHERE id = ?`,
      [
        form.status,
        form.amount,
        form.payment_mode,
        form.description,
        form.due_date,
        form.paid_date,
        form.notes,
        paymentId,
      ]
    );

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

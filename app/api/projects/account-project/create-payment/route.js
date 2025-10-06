import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM amounts");
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST: Add a new item

export async function POST(request) {
  try {
    const body = await request.json();
    const { form } = body;

    // Example usage
    // Split the 'id-name' format
    // Insert into projects
    const [projectResult] = await db.query(
      "INSERT INTO amounts (project_id,status,amount,payment_mode,description,due_date,paid_date,notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        form.project_id,
        form.status,
        form.amount,
        form.payment_mode,
        form.description,
        form.due_date,
        form.paid_date,
        form.notes,
      ]
    );
    // Insert into projects

    return NextResponse.json({ message: "All forms submitted successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

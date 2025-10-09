import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM invoices");
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

export async function POST(req, { params }) {
  const { projectId } = await params;

  try {
    const body = await req.json();
    const { form, member_id } = body;

    // Example usage
    // Split the 'id-name' format
    // Insert into projects
    const [projectResult] = await db.query(
      "INSERT INTO invoices (project_id,project_name,invoice_number,subject,invoice_date,billed_by,customer_notes,terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        projectId,
        form.project_name,
        form.invoice_number,
        form.subject,
        form.invoice_date,
        form.billed_by,
        form.customer_notes,
        form.terms,
      ]
    );
    // Insert into projects
    // ✅ Insert notification
    const note = `Invoice was officially created, marking the beginning of event preparation.`;
    const currentDate = new Date();

    await db.query(
      "INSERT INTO notifications (member_id, project_id, date, notes) VALUES (?, ?, ?, ?)",
      [member_id, projectId, currentDate, note]
    );
    return NextResponse.json({ message: "All forms submitted successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

// PUT: Update an existing item
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, price } = body;

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: "ID, name, and price are required" },
        { status: 400 }
      );
    }

    await db.execute("UPDATE invoices SET name = ?, price = ? WHERE id = ?", [
      name,
      price,
      id,
    ]);

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an item
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.execute("DELETE FROM invoices WHERE id = ?", [id]);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

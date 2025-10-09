import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
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
export async function POST(req) {
  try {
    const body = await req.json();
    const { form, member_id } = body;

    // Example usage
    // Split the 'id-name' format
    const [projectId, project_label] = form.project.split("-");
    // Insert into projects
    const [projectResult] = await db.query(
      "INSERT INTO tasks (project_id,project,name,assigned,priority,status,date,notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        projectId,
        project_label,
        form.name,
        form.assigned,
        form.priority,
        form.status,
        form.date,
        form.notes,
      ]
    );
    // Insert into projects
    // ✅ Insert notification
    const note = `Task "${project_label}" was officially created, marking the beginning of event preparation.`;
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

// DELETE: Delete an item
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.execute("DELETE FROM tasks WHERE id = ?", [id]);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

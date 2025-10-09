import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { deliverableId } = await params;

  try {
    // Query 1: Main shoot details
    const shootResult = await db.query(
      "SELECT * FROM deliverables WHERE id = ?",
      [deliverableId]
    );

    // Query 2: Tasks by deliverable_id
    const taskResult = await db.query(
      "SELECT * FROM tasks WHERE deliverable_id = ?",
      [deliverableId]
    );

    return NextResponse.json({
      deliverable: shootResult[0] || null,
      tasks: taskResult || [],
      // video_crew: videoCrewResult || [],
      // additional_crew: additionalCrewResult || [],
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
  const { deliverableId, projectId } = await params;
  const body = await request.json();

  const { form, form2, member_id } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE deliverables SET name = ?, quantity = ?, date = ?, status = ?, priority = ?, cost = ?, assigned = ?, notes = ? WHERE id = ?`,
      [
        form.name,
        form.quantity,
        form.date,
        form.status,
        form.priority,
        form.cost,
        form.assigned,
        form.notes,
        deliverableId,
      ]
    );

    // 2. Clear existing photo crew
    await db.query(`DELETE FROM tasks WHERE deliverable_id = ?`, [
      deliverableId,
    ]);

    // 3. Insert updated photo crew
    for (const crew of form2) {
      await db.query(
        "INSERT INTO tasks (project_id,deliverable_id,name,assigned,priority,date) VALUES (?, ?, ?, ?, ?, ?)",
        [
          projectId,
          deliverableId,
          crew.name,
          crew.assigned,
          crew.priority,
          crew.date,
        ]
      );
    }

    // ✅ Insert notification (log activity)
    const note = `Deliverable  was updated successfully with new details.`;
    const currentDate = new Date();

    await db.query(
      "INSERT INTO notifications (member_id, project_id, date, notes) VALUES (?, ?, ?, ?)",
      [member_id, projectId, currentDate, note]
    );

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, { params }) {
  const { projectId } = await params;

  try {
    // Query 1: Main shoot details
    const shootResult = await db.query(
      "SELECT * FROM shoots WHERE project_id = ?",
      [projectId]
    );

    // Query 2: Photo crew by shoot_id
    const deliverableResult = await db.query(
      "SELECT * FROM deliverables WHERE project_id = ?",
      [projectId]
    );

    // Query 3: Video crew by shoot_id
    const taskResult = await db.query(
      "SELECT * FROM tasks WHERE project_id = ?",
      [projectId]
    );

    // Query 4: Video crew by shoot_id
    const expenseResult = await db.query(
      "SELECT * FROM expenses WHERE project_id = ?",
      [projectId]
    );

    // Query 5: Video crew by shoot_id
    // const invoiceResult = await db.query(
    //   "SELECT * FROM invoices WHERE project_id = ?",
    //   [projectId]
    // );
    const [invoiceResult] = await db.query(
      `SELECT invoices.*, projects.name, projects.phone,projects.email,projects.cost,projects.client
   FROM invoices
   JOIN projects ON invoices.project_id = projects.id
   WHERE invoices.project_id = ?`,
      [projectId]
    );

    // Query 6: Video crew by shoot_id
    const paymentPaidResult = await db.query(
      "SELECT * FROM amounts WHERE project_id = ? AND status = 'paid' ",
      [projectId]
    );
    // Query 7: Video crew by shoot_id
    const paymentUpcomingResult = await db.query(
      "SELECT * FROM amounts WHERE project_id = ? AND status = 'upcoming' ",
      [projectId]
    );

    // Query 8: Video crew by shoot_id
    const projectResult = await db.query(
      "SELECT * FROM projects WHERE id = ?",
      [projectId]
    );

    return NextResponse.json({
      shoot: shootResult[0] || null,
      deliverable: deliverableResult[0] || null,
      task: taskResult[0] || null,
      expense: expenseResult[0] || null,
      invoice: invoiceResult,
      paymentpaid: paymentPaidResult[0] || null,
      paymentupcoming: paymentUpcomingResult[0] || null,
      projects: projectResult[0] || null,
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
  const { shootId, projectId } = await params;
  const body = await request.json();

  const { form1, form2, form3, form4 } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE shoots SET type = ?, duration = ?, venue = ?, city = ?, reporting = ?, slot = ?, date = ?, status = ?, notes = ? WHERE id = ?`,
      [
        form1.type,
        form1.duration,
        form1.venue,
        form1.city,
        form1.reporting,
        form1.slot,
        form1.date,
        form1.status,
        form1.notes,
        shootId,
      ]
    );

    // 2. Clear existing photo crew
    await db.query(`DELETE FROM crews_photo WHERE shoot_id = ?`, [shootId]);

    // 3. Insert updated photo crew
    for (const crew of form2) {
      await db.query(
        "INSERT INTO crews_photo (project_id,shoot_id,photo_crew,photo_role) VALUES (?, ?, ?, ?)",
        [projectId, shootId, crew.photo_crew, crew.photo_role]
      );
    }

    // 4. Clear existing video crew
    await db.query(`DELETE FROM crews_video WHERE shoot_id = ?`, [shootId]);

    // 5. Insert updated video crew
    for (const crew of form3) {
      await db.query(
        "INSERT INTO crews_video (project_id,shoot_id,video_crew,video_role) VALUES (?, ?, ?, ?)",
        [projectId, shootId, crew.video_crew, crew.video_role]
      );
    }

    // 4. Clear existing additional crew
    await db.query(`DELETE FROM crews_additional WHERE shoot_id = ?`, [
      shootId,
    ]);

    // 5. Insert updated additional crew
    for (const crew of form4) {
      await db.query(
        "INSERT INTO crews_additional (project_id,shoot_id,additional_crew,additional_role) VALUES (?, ?, ?, ?)",
        [projectId, shootId, crew.additional_crew, crew.additional_role]
      );
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

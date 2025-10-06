import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET() {
  try {
    const [[vendors], [expenses], [paymentPaid], [projects]] =
      await Promise.all([
        db.query("SELECT * FROM photo"),
        db.query("SELECT * FROM expenses"),

        db.query(`SELECT 
      amounts.*, 
      projects.name   AS project_name, 
      projects.client AS project_client, 
      projects.phone  AS project_phone, 
      projects.email  AS project_email, 
      projects.cost   AS project_cost
   FROM amounts
   JOIN projects ON amounts.project_id = projects.id
   `),
        db.query("SELECT * FROM projects"),
      ]);

    // Always return arrays (even if empty) so the frontend can map safely.
    return NextResponse.json({
      photo: vendors ?? [],
      expense: expenses ?? [],
      paymentpaid: paymentPaid ?? [],
      projects: projects ?? [],
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

import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

// export async function GET(request, { params }) {
//   const { shootId } = await params;
//   try {
//     const result = await db.query("SELECT * FROM shoots WHERE id = ?", [
//       shootId,
//     ]);
//     return NextResponse.json(result[0]);
//   } catch (error) {
//     return NextResponse.json({ message: error.message });
//   }
// }

export async function GET(request, { params }) {
  const { shootId } = await params;

  try {
    // Query 1: Main shoot details
    const shootResult = await db.query("SELECT * FROM shoots WHERE id = ?", [
      shootId,
    ]);

    // Query 2: Photo crew by shoot_id
    const photoCrewResult = await db.query(
      "SELECT * FROM crews_photo WHERE shoot_id = ?",
      [shootId]
    );

    // Query 3: Video crew by shoot_id
    const videoCrewResult = await db.query(
      "SELECT * FROM crews_video WHERE shoot_id = ?",
      [shootId]
    );

    // Query 3: Video crew by shoot_id
    const additionalCrewResult = await db.query(
      "SELECT * FROM crews_additional WHERE shoot_id = ?",
      [shootId]
    );

    return NextResponse.json({
      shoot: shootResult[0] || null,
      photo_crew: photoCrewResult || [],
      video_crew: videoCrewResult || [],
      additional_crew: additionalCrewResult || [],
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

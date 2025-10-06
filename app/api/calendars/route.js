import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET() {
  try {
    // Note: adjust fields in JSON_OBJECT(...) to match your actual column names
    const [rows] = await db.query(
      `
      SELECT 
        p.id   AS project_id, p.name AS project_name, p.cost, p.client, p.relation,
        p.phone, p.email,
        s.id   AS shoot_id, s.status, s.reporting, s.slot, s.type, s.city,
        s.duration, s.venue, s.date, s.notes,
        cp.id  AS photo_id, cp.photo_crew AS photo_crew, cp.photo_role AS photo_role,
        cv.id  AS video_id, cv.video_crew AS video_crew, cv.video_role AS video_role
      FROM projects p
      LEFT JOIN shoots s       ON p.id = s.project_id
      LEFT JOIN crews_photo cp ON s.id = cp.shoot_id
      LEFT JOIN crews_video cv ON s.id = cv.shoot_id
      ORDER BY p.id, s.id
      `
    );

    const projectsMap = new Map();

    for (const row of rows) {
      // project
      if (!projectsMap.has(row.project_id)) {
        projectsMap.set(row.project_id, {
          id: row.project_id,
          name: row.project_name,
          cost: row.cost,
          client: row.client,
          relation: row.relation,
          phone: row.phone,
          email: row.email,
          shoots: [],
        });
      }
      const project = projectsMap.get(row.project_id);

      // shoot
      if (row.shoot_id) {
        let shoot = project.shoots.find((s) => s.id === row.shoot_id);
        if (!shoot) {
          shoot = {
            id: row.shoot_id,
            status: row.status,
            reporting: row.reporting,
            slot: row.slot,
            type: row.type,
            city: row.city,
            duration: row.duration,
            venue: row.venue,
            date: row.date,
            notes: row.notes,
            photos: [],
            videos: [],
          };
          project.shoots.push(shoot);
        }

        // photo
        if (row.photo_id) {
          if (!shoot.photos.find((p) => p.id === row.photo_id)) {
            shoot.photos.push({
              id: row.photo_id,
              photo_crew: row.photo_crew,
              photo_role: row.photo_role,
            });
          }
        }

        // video
        if (row.video_id) {
          if (!shoot.videos.find((v) => v.id === row.video_id)) {
            shoot.videos.push({
              id: row.video_id,
              video_crew: row.video_crew,
              video_role: row.video_role,
            });
          }
        }
      }
    }

    return NextResponse.json({ projects: Array.from(projectsMap.values()) });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const body = await request.json();

  const { form } = body;

  try {
    // 1. Update shoot info
    await db.query(
      `UPDATE shoots SET type = ?, venue = ?, reporting = ?, slot = ?, date = ? WHERE id = ?`,
      [form.type, form.venue, form.reporting, form.slot, form.date, form.id]
    );

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
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

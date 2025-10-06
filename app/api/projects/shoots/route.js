import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM shoots");
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
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name,type,duration, venue, city,reporting,slot,date,status,notes,photo_crew,photo_role,video_crew,video_role,additional_crew,additional_role} = body;

//     if (!name || !duration) {
//       return NextResponse.json({ error: 'Name and duration are required' }, { status: 400 });
//     }

//     const [result] = await db.execute(
//       'INSERT INTO shoots (name,type,duration, venue, city,reporting,slot,date,status,notes,photo_crew,photo_role,video_crew,video_role,additional_crew,additional_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name,type,duration, venue, city,reporting,slot,date,status,notes,photo_crew,photo_role,video_crew,video_role,additional_crew,additional_role]
//     );

//     return NextResponse.json({
//       message: 'Item created successfully',
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error('POST Error:', error);
//     return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    const body = await req.json();
    const { form1, form2, form3, form4 } = body;

    // Example usage
    // Split the 'id-name' format
    const [project_id, project_label] = form1.name.split("-");
    // Insert into projects
    const [projectResult] = await db.query(
      "INSERT INTO shoots (project_id,name,type,duration,venue,city,reporting,slot,date,status,notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        project_id,
        project_label,
        form1.type,
        form1.duration,
        form1.venue,
        form1.city,
        form1.reporting,
        form1.slot,
        form1.date,
        form1.status,
        form1.notes,
      ]
    );
    const ShootId = projectResult.insertId; // ✅ Get last inserted ID
    // Insert into projects

    // Insert multiple rows into shoots
    for (const photo of form2) {
      await db.query(
        "INSERT INTO crews_photo (project_id,shoot_id,photo_id,photo_role,dayslot) VALUES (?, ?, ?, ?, ?)",
        [project_id, ShootId, photo.photo_crew, photo.photo_role, photo.dayslot]
      );
    }

    // Insert multiple rows into shoots
    for (const video of form3) {
      await db.query(
        "INSERT INTO crews_video (project_id,shoot_id,photo_id,video_role,dayslot) VALUES (?, ?, ?, ?, ?)",
        [project_id, ShootId, video.video_crew, video.video_role, video.dayslot]
      );
    }

    // Insert multiple rows into deliverables
    for (const item of form4) {
      await db.query(
        "INSERT INTO crews_additional (project_id,shoot_id,additional_crew,additional_role) VALUES (?, ?, ?, ?)",
        [project_id, ShootId, item.additional_crew, item.additional_role]
      );
    }

    return NextResponse.json({ message: "All forms submitted successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
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

    await db.execute("DELETE FROM shoots WHERE id = ?", [id]);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

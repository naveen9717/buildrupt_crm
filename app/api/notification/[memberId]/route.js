import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

export async function GET(request, { params }) {
  // safely get memberId from params
  const { memberId } = params ?? {};

  if (!memberId) {
    return NextResponse.json({ error: "Missing memberId" }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT 
        n.id AS notification_id,
        n.notes,
        n.date,
        n.project_id,
        p.name AS project_name,
        tm.name AS member_name
      FROM notifications n
      LEFT JOIN projects p ON n.project_id = p.id
      LEFT JOIN team_members tm ON n.member_id = tm.id
      WHERE n.member_id = ?
      ORDER BY n.date DESC
      `,
      [memberId]
    );

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Notification fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET(request, context) {
  const { photoId } = await context.params;

  try {
    // --- 1) expenses (unchanged) ---
    const [rows] = await db.query(
      `
      SELECT
        p.id           AS photo_id,
        p.name         AS photo_name,
        p.half,
        p.full,
        p.halffull,
        e.id           AS expense_id,
        e.amount,
        e.date,
        e.event,
        e.spentby,
        e.project_id   AS expense_project_id,
        pr.id          AS project_id,
        pr.name        AS project_name,
        pr.cost        AS project_cost
      FROM photo p
      LEFT JOIN expenses e
        ON e.photo_id = p.id
      LEFT JOIN projects pr
        ON pr.id = e.project_id
      WHERE p.id = ?
      ORDER BY e.date ASC, e.id ASC
      `,
      [photoId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: "Photo not found" }, { status: 404 });
    }

    // --- 2) crews_photo with dayslot_price + project_name + shoot_type + shoot date ---
    const [crewPhotos] = await db.query(
      `
      SELECT
        cp.*,
        pr.name AS project_name,
        s.type  AS shoot_type,
        s.date  AS date,               -- 👈 shoot date from shoots
        CASE cp.dayslot
          WHEN 'half'     THEN p.half
          WHEN 'full'     THEN p.full
          WHEN 'halffull' THEN p.halffull
          ELSE NULL
        END AS dayslot_price
      FROM crews_photo cp
      INNER JOIN photo   p ON p.id = cp.photo_id
      LEFT  JOIN projects pr ON pr.id = cp.project_id
      LEFT  JOIN shoots   s ON s.id = cp.shoot_id
      WHERE cp.photo_id = ?
      ORDER BY cp.id ASC
      `,
      [photoId]
    );

    // --- 3) crews_video with dayslot_price + project_name + shoot_type + shoot date ---
    const [crewVideos] = await db.query(
      `
      SELECT
        cv.*,
        pr.name AS project_name,
        s.type  AS shoot_type,
        s.date  AS date,               -- 👈 shoot date from shoots
        CASE cv.dayslot
          WHEN 'half'     THEN p.half
          WHEN 'full'     THEN p.full
          WHEN 'halffull' THEN p.halffull
          ELSE NULL
        END AS dayslot_price
      FROM crews_video cv
      INNER JOIN photo   p ON p.id = cv.photo_id
      LEFT  JOIN projects pr ON pr.id = cv.project_id
      LEFT  JOIN shoots   s ON s.id = cv.shoot_id
      WHERE cv.photo_id = ?
      ORDER BY cv.id ASC
      `,
      [photoId]
    );

    // --- 4) build expenses grouped (null if none) ---
    const hasExpenses = rows.some((r) => r.expense_id !== null);
    let expenses = null;

    if (hasExpenses) {
      const groups = new Map();
      for (const r of rows) {
        const groupKey = r.project_id ?? "__NULL__";
        if (!groups.has(groupKey)) {
          groups.set(groupKey, {
            photo_id: r.photo_id,
            name: r.photo_name,
            half: r.half,
            full: r.full,
            halffull: r.halffull,
            projects_name: r.project_id ? r.project_name : null,
            projects_cost: r.project_id ? r.project_cost : null,
            expenses: [],
          });
        }
        if (r.expense_id != null) {
          groups.get(groupKey).expenses.push({
            expense_id: r.expense_id,
            amount: r.amount,
            event: r.event,
            date: r.date,
            spentby: r.spentby,
          });
        }
      }
      expenses = Array.from(groups.values());
    }

    // --- 5) combine crews into one array (now includes shoot 'date') ---
    const crews = [
      ...(crewPhotos ?? []).map((c) => ({
        crew_type: "photo",
        crew_id: c.id,
        ...c, // includes project_name, shoot_type, date, dayslot_price, etc.
      })),
      ...(crewVideos ?? []).map((c) => ({
        crew_type: "video",
        crew_id: c.id,
        ...c,
      })),
    ];

    return NextResponse.json({ expenses, crews });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
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

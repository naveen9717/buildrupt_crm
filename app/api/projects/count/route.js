import { db } from "@/config/db.js";

import { NextResponse,NextRequest } from "next/server";

// GET: Return count of unique statuses and names
export async function GET() {
  try {
    // Get total count of non-null status entries
     const [tasksResult] = await db.query(`
      SELECT COUNT(name) AS nameCount FROM tasks
    `);


    // Get total count of non-null name entries
    const [shootsResult] = await db.query(`
      SELECT COUNT(name) AS nameCount FROM shoots
    `);

     // Get total count of non-null name entries
    const [deliverablesResult] = await db.query(`
      SELECT COUNT(name) AS nameCount FROM deliverables
    `);

      // Get total count of non-null name entries
    const [projectResult] = await db.query(`
      SELECT COUNT(name) AS nameCount FROM projects
    `);

    return NextResponse.json({
      taskCount: tasksResult[0].nameCount,
      shootCount: shootsResult[0].nameCount,
      deliverableCount:deliverablesResult[0].nameCount,
      projectCount:projectResult[0].nameCount,
    });
  } catch (error) {
    console.error("Count Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
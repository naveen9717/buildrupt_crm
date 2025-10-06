import { db } from "@/config/db.js";

import { NextResponse,NextRequest } from "next/server";

// GET: Return count of unique statuses and names
export async function GET() {
  try {
    // Get total count of non-null status entries
     const [photoResult] = await db.query(`
      SELECT COUNT(name) AS photoCount FROM photo
    `);


     // Get total count of non-null name entries
    const [additionalResult] = await db.query(`
      SELECT COUNT(name) AS additionalCount FROM additional
    `);

    return NextResponse.json({
      photoCount: photoResult[0].photoCount,
      additionalCount:additionalResult[0].additionalCount,
    });
  } catch (error) {
    console.error("Count Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
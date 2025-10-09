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

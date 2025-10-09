import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM projects");
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

export async function POST(req) {
  try {
    const body = await req.json();
    const { form1, form2, form3, form4, member_id } = body;

    // Insert into projects
    const [projectResult] = await db.query(
      "INSERT INTO projects (name,cost,client,relation,phone,email) VALUES (?, ?, ?, ?, ?, ?)",
      [
        form1.name,
        form1.cost,
        form1.client,
        form1.relation,
        form1.phone,
        form1.email,
      ]
    );
    const projectId = projectResult.insertId; // ✅ Get last inserted ID
    // Insert into projects
    await db.query(
      "INSERT INTO amounts (project_id,amount,description,paid_date) VALUES (?, ?, ?, ?)",
      [projectId, form4.amount, form4.description, form4.date]
    );

    // Insert multiple rows into shoots
    for (const shoot of form2) {
      await db.query(
        "INSERT INTO shoots (project_id,name,date,slot,city) VALUES (?, ?, ?, ?, ?)",
        [projectId, shoot.name, shoot.date, shoot.slot, shoot.city]
      );
    }

    // Insert multiple rows into deliverables
    for (const item of form3) {
      await db.query(
        "INSERT INTO deliverables (project_id,name,cost,quantity,date) VALUES (?, ?, ?, ?, ?)",
        [projectId, item.name, item.cost, item.quantity, item.date]
      );
    }

    // ✅ Insert notification
    const note = `Project "${form1.name}" was officially created, marking the beginning of event preparation.`;
    const currentDate = new Date();

    await db.query(
      "INSERT INTO notifications (member_id, project_id, date, notes) VALUES (?, ?, ?, ?)",
      [member_id, projectId, currentDate, note]
    );

    return NextResponse.json({ message: "All forms submitted successfully" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Insertion failed" }, { status: 500 });
  }
}

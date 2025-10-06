import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM team_members");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // ✅ read id from body

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const [result] = await db.query("DELETE FROM team_members WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Member not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Member deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

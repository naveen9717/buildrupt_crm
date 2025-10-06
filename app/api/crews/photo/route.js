import { db } from "@/config/db.js";

import { NextResponse, NextRequest } from "next/server";

// GET: Fetch all items
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM photo");
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
    const {
      name,
      half_label,
      half,
      full_label,
      full,
      halffull_label,
      halffull,
      status,
    } = body;

    if (!name || !status) {
      return NextResponse.json(
        { error: "Name and status are required" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "INSERT INTO photo (name,half_label,half,full_label,full,halffull_label,halffull,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        half_label,
        half,
        full_label,
        full,
        halffull_label,
        halffull,
        status,
      ]
    );

    return NextResponse.json({
      message: "Item created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing item
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, price } = body;

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: "ID, name, and price are required" },
        { status: 400 }
      );
    }

    await db.execute("UPDATE photo SET name = ?, price = ? WHERE id = ?", [
      name,
      price,
      id,
    ]);

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
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

    await db.execute("DELETE FROM photo WHERE id = ?", [id]);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

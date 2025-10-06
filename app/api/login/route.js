import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

// GET /api/login?id=123  -> fetch one user by id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const [rows] = await db.query(
      "SELECT id, name, role, mobile, email, password, address FROM team_members WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // You asked for plain password; returning it here as well
    return NextResponse.json({ success: true, user: rows[0] }, { status: 200 });
  } catch (err) {
    console.error("GET /api/login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** LOGIN (plain password) */
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      "SELECT id, name,mobile, email, password, role, address FROM team_members WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const user = rows[0];

    // ❗ Plain-text comparison (as requested)
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        password: user.password,
        role: user.role,
        address: user.address,
        // password is NOT returned by default for safety; add if you really need it
      },
    });
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/login  -> update profile by id (only your 6 fields)
export async function PUT(req) {
  try {
    const { id, name, role, mobile, email, password, address } =
      await req.json();

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "id, name and email are required" },
        { status: 400 }
      );
    }

    // Build SET list only for provided fields
    const sets = [];
    const vals = [];

    sets.push("name = ?");
    vals.push(name);
    sets.push("role = ?");
    vals.push(role ?? null);
    sets.push("mobile = ?");
    vals.push(mobile ?? null);
    sets.push("email = ?");
    vals.push(email);
    sets.push("address = ?");
    vals.push(address ?? null);
    if (password) {
      sets.push("password = ?");
      vals.push(password);
    } // plain

    const sql = `UPDATE team_members SET ${sets.join(
      ", "
    )} WHERE id = ? LIMIT 1`;
    vals.push(id);

    await db.query(sql, vals);

    // Return fresh record (including password since you want it)
    const [rows] = await db.query(
      "SELECT id, name, role, mobile, email, password, address FROM team_members WHERE id = ? LIMIT 1",
      [id]
    );

    return NextResponse.json({ success: true, user: rows[0] }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

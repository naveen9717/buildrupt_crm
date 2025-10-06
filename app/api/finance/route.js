import { NextResponse } from "next/server";
import { db } from "@/config/db.js";

export async function GET() {
  try {
    const [amountsResult] = await db.query(`
      SELECT a.*, p.id AS project_id, p.name AS project_name, p.cost AS project_cost
      FROM amounts a
      JOIN projects p ON a.project_id = p.id
    `);

    const [expensesResult] = await db.query(`
      SELECT e.*, p.id AS project_id, p.name AS project_name, p.cost AS project_cost
      FROM expenses e
      JOIN projects p ON e.project_id = p.id
    `);

    const [invoicesResult] = await db.query(`
      SELECT i.*, p.id AS project_id, p.name AS project_name, p.cost AS project_cost
      FROM invoices i
      JOIN projects p ON i.project_id = p.id
    `);

    return NextResponse.json({
      amounts: {
        rows: amountsResult,
        count: amountsResult.length,
      },
      expenses: {
        rows: expensesResult,
        count: expensesResult.length,
      },
      invoices: {
        rows: invoicesResult,
        count: invoicesResult.length,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

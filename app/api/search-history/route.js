import { NextResponse } from "next/server";
import pool from "@/lib/db";
export async function POST(req) {
  try {

    const { searched_text, type, source } = await req.json();

    if (!searched_text || !searched_text.trim()) {
      return NextResponse.json(
        { message: "Search text required" },
        { status: 400 }
      );
    }

    const keyword = searched_text.trim();

    // 🔎 check duplicate
    const [rows] = await pool.query(
      `SELECT id FROM search_history 
       WHERE searched_text = ? 
       AND IFNULL(type,'') = IFNULL(?, '')
       AND IFNULL(source,'') = IFNULL(?, '') 
       LIMIT 1`,
      [keyword, type, source]
    );

    if (rows.length === 0) {

      await pool.query(
        `INSERT INTO search_history 
        (username, searched_text, type, source) 
        VALUES (?, ?, ?, ?)`,
        ['', keyword, type, source]
      );

    } else {

      // optional: update timestamp
      await pool.query(
        `UPDATE search_history 
         SET searched_at = NOW() 
         WHERE id = ?`,
        [rows[0].id]
      );

    }

    return NextResponse.json({ message: "Search saved" });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );

  }
}

// GET -> Fetch search history
export async function GET() {
  try {

    const [rows] = await pool.query(
      "SELECT id, username, searched_text, type, source, searched_at FROM search_history ORDER BY searched_at DESC"
    );

    return NextResponse.json(rows);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}


// DELETE single OR clear all
export async function DELETE(req) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id === "all") {

      await pool.query("DELETE FROM search_history");

      return NextResponse.json({ message: "All history cleared" });

    }

    await pool.query(
      "DELETE FROM search_history WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );

  }
}
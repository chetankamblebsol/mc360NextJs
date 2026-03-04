// app/api/search/route.js

export const revalidate = 10; // enable caching (FAST)

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") || "";
  const type = searchParams.get("type") || "";
  const source = searchParams.get("source") || "";
  const page = Number(searchParams.get("page") || 1);

  const limit = 50;
  const offset = (page - 1) * limit;

  // empty search protection
  if (!name.trim()) {
    return NextResponse.json({
      page,
      limit,
      total: 0,
      totalCount: 0,
      results: [],
    });
  }

  try {
   
    const [rows] = await db.query(
      "CALL SearchAllView(?,?,?,?,?)",
      [name, type, source, limit, offset]
    );

    const results = rows?.[0] ?? [];
    const totalCount = results?.[0]?.TOTAL_COUNT ?? 0;

    return NextResponse.json({
      page,
      limit,
      total: results.length,
      totalCount,
      results,
    });
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json(
      {
        page,
        limit,
        total: 0,
        totalCount: 0,
        results: [],
      },
      { status: 500 }
    );
  }
}
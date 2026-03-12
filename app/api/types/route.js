export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT DISTINCT TYPE
      FROM sanctions_search_index
      WHERE TYPE IS NOT NULL
      ORDER BY TYPE
    `;

    const [rows] = await db.query(query);

    return NextResponse.json({
      types: rows.map(row => row.TYPE)
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json({
      types: []
    }, { status: 500 });
  }
}
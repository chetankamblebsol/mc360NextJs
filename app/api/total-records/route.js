export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM us_details) +
        (SELECT COUNT(*) FROM us_details_v) +
        (SELECT COUNT(*) FROM uk_details) +
        (SELECT COUNT(*) FROM un_details) +
        (SELECT COUNT(*) FROM eu_details) +
        (SELECT COUNT(*) FROM eu_sanctioned_vessels_test) +
        (SELECT COUNT(*) FROM ofac_file_hashes)
      AS TOTAL_RECORDS
    `;

    const [rows] = await db.query(query);
    return NextResponse.json({ totalRecords: rows[0].TOTAL_RECORDS || 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ totalRecords: 0 }, { status: 500 });
  }
}

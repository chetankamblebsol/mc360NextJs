export const dynamic = 'force-dynamic';

import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');
  const id = searchParams.get('id');

  const allowedTables = [
    'us_details', 'us_details_v', 'uk_details', 'un_details',
    'eu_details', 'eu_sanctioned_vessels_test', 'job_last_run_date', 'ofac_file_hashes'
  ];

  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  let query = `SELECT * FROM ${table} WHERE ID=? LIMIT 1`;
  if (table === 'us_details_v') query = `SELECT * FROM ${table} WHERE A_ID=? LIMIT 1`;
  else if (table === 'un_details') query = `SELECT * FROM ${table} WHERE AUTO_ID=? LIMIT 1`;
  else if (table === 'job_last_run_date' || table === 'ofac_file_hashes') query = `SELECT * FROM ${table} WHERE my_row_id=? LIMIT 1`;

  const [rows] = await db.query(query, [id]);
  
  return NextResponse.json({ record: rows[0] || null });
}

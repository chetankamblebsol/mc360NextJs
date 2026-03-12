import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {

    // Example: call stored procedure
    // await db.query('CALL RefreshSearchIndex()');

    // OR test query
    await db.query('SELECT 1');

    return NextResponse.json({
      status: 'Successfully Synced'
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: 'Sync Failed'
    }, { status: 500 });
  }
}
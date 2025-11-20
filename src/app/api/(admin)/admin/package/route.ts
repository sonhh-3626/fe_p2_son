import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET(request: Request) {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(dbContent);
    const packages = data.packages;

    return NextResponse.json(packages, { status: 200 });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

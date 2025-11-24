import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PackageFormData } from '@/libs/schemas/packageSchema';
import { Package } from '@/types/Package';

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

export async function POST(request: Request) {
  try {
    const newPackage: PackageFormData = await request.json();
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbContent = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(dbContent);

    // Assign a new ID to the package
    const lastPackageId = db.packages.length > 0 ? Math.max(...db.packages.map((p: Package) => p.id)) : 0;
    const packageToSave = { ...newPackage, id: lastPackageId + 1 };

    db.packages.push(packageToSave);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Package created successfully', data: packageToSave }, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

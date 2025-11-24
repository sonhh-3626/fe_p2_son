import { NextResponse } from 'next/server';
import { Package } from '@/types/Package';
import { PackageFormData } from '@/libs/schemas/packageSchema';
import { readJsonFile, writeJsonFile } from '@/utils/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
  const { id } = await params;
    const db = await readJsonFile();
    const packageItem: Package | undefined = db.packages.find((p: Package) => p.id === Number(id));

    if (!packageItem) {
      return NextResponse.json({ message: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json(packageItem, { status: 200 });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
     const { id } = await params;
    const updatedPackageData: PackageFormData = await request.json();
    const db = await readJsonFile();

    const packageIndex = db.packages.findIndex((p: Package) => p.id === Number(id));

    if (packageIndex === -1) {
      return NextResponse.json({ message: 'Package not found' }, { status: 404 });
    }

    const updatedPackage = { ...db.packages[packageIndex], ...updatedPackageData, id: Number(id) };
    db.packages[packageIndex] = updatedPackage;

    await writeJsonFile(db);

    return NextResponse.json({ message: `Package ${id} updated successfully`, data: updatedPackage }, { status: 200 });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
     const { id } = await params;
    const db = await readJsonFile();

    const initialLength = db.packages.length;
    db.packages = db.packages.filter((p: Package) => p.id !== Number(id));

    if (db.packages.length === initialLength) {
      return NextResponse.json({ message: 'Package not found' }, { status: 404 });
    }

    await writeJsonFile(db);

    return NextResponse.json({ message: `Package ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

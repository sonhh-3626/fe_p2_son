import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs/promises';
import path from 'path';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface BankAccount {
  id: number;
  userId: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Database {
  bank_accounts: BankAccount[];
  users?: any[];
  reviews?: any[];
}

async function readDB(): Promise<Database> {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

async function writeDB(data: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// PUT - Cập nhật bank account
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const accountId = Number((await params).id);
    const body = await req.json();
    const { bankName, accountNumber, accountHolder, isDefault } = body;

    const db = await readDB();
    const userId = Number(session.user.id);

    const accountIndex = db.bank_accounts.findIndex(
      (acc) => acc.id === accountId && acc.userId === userId
    );

    if (accountIndex === -1) {
      return NextResponse.json(
        { error: 'Bank account not found' },
        { status: 404 }
      );
    }

    // Nếu set isDefault = true, bỏ default cũ
    if (isDefault) {
      db.bank_accounts = db.bank_accounts.map((acc) =>
        acc.userId === userId && acc.id !== accountId
          ? { ...acc, isDefault: false }
          : acc
      );
    }

    // Update account
    db.bank_accounts[accountIndex] = {
      ...db.bank_accounts[accountIndex],
      bankName: bankName || db.bank_accounts[accountIndex].bankName,
      accountNumber: accountNumber || db.bank_accounts[accountIndex].accountNumber,
      accountHolder: accountHolder || db.bank_accounts[accountIndex].accountHolder,
      isDefault: isDefault !== undefined ? isDefault : db.bank_accounts[accountIndex].isDefault,
      updatedAt: new Date().toISOString(),
    };

    await writeDB(db);

    return NextResponse.json(db.bank_accounts[accountIndex]);
  } catch (error) {
    console.error('Error updating bank account:', error);
    return NextResponse.json(
      { error: 'Failed to update bank account' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa bank account
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const accountId = Number((await params).id);
    const db = await readDB();
    const userId = Number(session.user.id);

    const accountIndex = db.bank_accounts.findIndex(
      (acc) => acc.id === accountId && acc.userId === userId
    );

    if (accountIndex === -1) {
      return NextResponse.json(
        { error: 'Bank account not found' },
        { status: 404 }
      );
    }

    db.bank_accounts.splice(accountIndex, 1);
    await writeDB(db);

    return NextResponse.json({ message: 'Bank account deleted successfully' });
  } catch (error) {
    console.error('Error deleting bank account:', error);
    return NextResponse.json(
      { error: 'Failed to delete bank account' },
      { status: 500 }
    );
  }
}

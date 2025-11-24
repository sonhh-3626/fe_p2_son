import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs/promises';
import path from 'path';
import { authOptions } from '../../auth/[...nextauth]/route';

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

// GET - Lấy danh sách bank accounts của user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await readDB();
    const userAccounts = db.bank_accounts.filter(
      (acc) => acc.userId === Number(session.user.id)
    );

    return NextResponse.json(userAccounts);
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bank accounts' },
      { status: 500 }
    );
  }
}

// POST - Thêm bank account mới
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { bankName, accountNumber, accountHolder, isDefault } = body;

    // Validation
    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await readDB();
    const userId = Number(session.user.id);

    // Nếu set isDefault = true, bỏ default cũ
    if (isDefault) {
      db.bank_accounts = db.bank_accounts.map((acc) =>
        acc.userId === userId ? { ...acc, isDefault: false } : acc
      );
    }

    // Tạo ID mới
    const newId = db.bank_accounts.length > 0
      ? Math.max(...db.bank_accounts.map((a) => a.id)) + 1
      : 1;

    const newAccount: BankAccount = {
      id: newId,
      userId,
      bankName,
      accountNumber,
      accountHolder,
      isDefault: isDefault || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.bank_accounts.push(newAccount);
    await writeDB(db);

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error('Error creating bank account:', error);
    return NextResponse.json(
      { error: 'Failed to create bank account' },
      { status: 500 }
    );
  }
}

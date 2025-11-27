import { NextResponse } from 'next/server';
import { requireSession } from "@/utils/auth";
import { findUserIndex, getUserData } from '@/libs/api/user';

export async function GET() {
  try {
    const session = await requireSession();

    const { users } = await getUserData();
    const userIndex = findUserIndex(users, session.user.id);

    const user = users[userIndex];

    const contactInfo = {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      birthday: user.birthday || ''
    };

    return NextResponse.json(
      { success: true, data: contactInfo },
      { status: 200 }
    );

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load contact information";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

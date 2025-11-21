import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireSession } from "@/utils/auth";
import { validateBody } from "@/utils/validate";
import { checkEmailDuplicate, findUserIndex, getUserData, updateUserProfile } from '@/libs/api/user';
import { profileSchema } from '@/lib/types';

export async function GET() {
  try {
    const session = await requireSession();

    const { users } = await getUserData();
    const userIndex = findUserIndex(users, session.user.id);

    const user = users[userIndex];
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 200 }
    );

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể tải profile";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requireSession();

    const body = await request.json();
    const validated = validateBody(profileSchema, body);

    const { data, users } = await getUserData();

    const userIndex = findUserIndex(users, session.user.id);

    checkEmailDuplicate(users, validated.email, userIndex);

    const updatedUser = await updateUserProfile(
      data,
      users,
      userIndex,
      {
        username: validated.username,
        email: validated.email,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedUser,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Cập nhật thất bại",
    }, { status: 500 });
  }
}

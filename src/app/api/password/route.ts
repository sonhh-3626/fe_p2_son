import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { readJsonFile, writeJsonFile } from '@/libs/utils/db';

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validated = passwordSchema.parse(body);

    // Đọc db.json
    const data = await readJsonFile();
    const users = data.users;

    // Tìm user theo session
    const userIndex = users.findIndex((u: any) => u.id === session.user.id);
    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const user = users[userIndex];

    // Kiểm tra current password
    const isMatch = await bcrypt.compare(validated.currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Mật khẩu hiện tại không đúng' }, { status: 400 });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(validated.newPassword, 10);
    user.password = hashedPassword;

    // Lưu lại db.json
    await writeJsonFile(data);

    return NextResponse.json({
      success: true,
      message: 'Đổi mật khẩu thành công',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: 'Đổi mật khẩu thất bại' }, { status: 500 });
  }
}

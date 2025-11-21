import { NextResponse } from "next/server";
import {
  validateBase64Image,
  decodeBase64Image,
  generateFileName,
  saveImageToPublic
} from "@/utils/image";
import { requireSession } from "@/utils/auth";
import { updateUserAvatar } from "@/utils/db";


export async function PUT(request: Request) {
  try {
    const session = await requireSession();
    const { avatar } = await request.json();

    const { ext, base64 } = validateBase64Image(avatar);
    const buffer = decodeBase64Image(base64);
    const fileName = generateFileName(ext);

    const avatarPath = saveImageToPublic(buffer, fileName);

    const updatedUser = await updateUserAvatar(session.user.id, avatarPath);

    return NextResponse.json({
      success: true,
      message: "Upload avatar thành công",
      data: updatedUser,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message ?? "Upload thất bại" },
      { status: 500 }
    );
  }
}

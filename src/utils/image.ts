import fs from 'fs';
import path from 'path';

export function saveImageToPublic(buffer: Buffer, fileName: string) {
  const savePath = path.join(process.cwd(), 'public', 'images', 'avatar', fileName);
  fs.writeFileSync(savePath, buffer);
  return `/images/avatar/${fileName}`;
}

export function validateBase64Image(avatar: string) {
  if (!avatar || !avatar.startsWith('data:image/')) {
    throw new Error('Invalid image format');
  }

  const matches = avatar.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid image data');
  }

  return {
    ext: matches[1],
    base64: matches[2],
  };
}

export function decodeBase64Image(base64: string) {
  return Buffer.from(base64, 'base64');
}

export function generateFileName(ext: string) {
  return `${crypto.randomUUID()}.${ext}`;
}

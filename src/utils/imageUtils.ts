import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image";

export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Chỉ chấp nhận file JPG, PNG hoặc WebP' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File không được vượt quá 5MB' };
  }

  return { valid: true };
}

export async function compressImage(file: File, maxWidth = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };

      img.onerror = () => reject(new Error('Không thể load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsDataURL(file);
  });
}

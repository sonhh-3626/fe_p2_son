import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
}

// Schema validation
export const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username phải có ít nhất 3 ký tự')
    .max(20, 'Username không quá 20 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username chỉ chứa chữ, số và _'),
  email: z.string()
    .email('Email không hợp lệ')
    .toLowerCase(),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
  newPassword: z.string()
    .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Phải có ít nhất 1 số'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;

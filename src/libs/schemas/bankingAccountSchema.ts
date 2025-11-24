import { z } from 'zod';

export const bankAccountSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Vui lòng nhập tên ngân hàng')
    .max(100, 'Tên ngân hàng không được vượt quá 100 ký tự'),

  accountNumber: z
    .string()
    .min(1, 'Vui lòng nhập số tài khoản')
    .regex(/^\d+$/, 'Số tài khoản chỉ được chứa số')
    .min(6, 'Số tài khoản phải có ít nhất 6 chữ số')
    .max(20, 'Số tài khoản không được vượt quá 20 chữ số'),

  accountHolder: z
    .string()
    .min(1, 'Vui lòng nhập tên chủ tài khoản')
    .min(3, 'Tên chủ tài khoản phải có ít nhất 3 ký tự')
    .max(100, 'Tên chủ tài khoản không được vượt quá 100 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chủ tài khoản chỉ được chứa chữ cái'),

  isDefault: z.boolean().default(false),
});

export type BankAccountFormData = z.infer<typeof bankAccountSchema>;

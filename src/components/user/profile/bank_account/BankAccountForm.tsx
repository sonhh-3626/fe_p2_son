'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { BankNameInput } from './BankNameInput';
import { BankAccountFormData, bankAccountSchema } from '@/libs/schemas/bankingAccountSchema';

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

interface BankAccountFormProps {
  account?: BankAccount | null;
  onClose: () => void;
}

export function BankAccountForm({ account, onClose }: BankAccountFormProps) {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankName: account?.bankName || '',
      accountNumber: account?.accountNumber || '',
      accountHolder: account?.accountHolder || '',
      isDefault: account?.isDefault || false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BankAccountFormData) => {
      const url = account
        ? `/api/profile/bank-accounts/${account.id}`
        : '/api/profile/bank-accounts';

      const res = await fetch(url, {
        method: account ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      onClose();
    },
    onError: (error: Error) => {
      // Set form-level error
      setError('root', {
        type: 'manual',
        message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    },
  });

  const onSubmit = (data: BankAccountFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {account ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <BankNameInput
                value={field.value}
                onChange={field.onChange}
                error={errors.bankName?.message}
              />
            )}
          />

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số tài khoản <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('accountNumber')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập số tài khoản"
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* Account Holder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên chủ tài khoản <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('accountHolder')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.accountHolder ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập tên chủ tài khoản (VD: NGUYEN VAN A)"
            />
            {errors.accountHolder && (
              <p className="mt-1 text-sm text-red-600">
                {errors.accountHolder.message}
              </p>
            )}
          </div>

          {/* Is Default Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="isDefault"
                {...register('isDefault')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="isDefault" className="text-sm font-medium text-gray-700">
                Đặt làm tài khoản mặc định
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Tài khoản này sẽ được sử dụng cho các giao dịch thanh toán
              </p>
            </div>
          </div>

          {/* Root Error (API errors) */}
          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{errors.root.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang lưu...</span>
                </>
              ) : (
                <span>{account ? 'Cập nhật' : 'Thêm mới'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

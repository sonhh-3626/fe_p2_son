'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { BankAccountForm } from './BankAccountForm';
import { Trash2, Edit2, Plus, CreditCard } from 'lucide-react';

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

export function BankAccountList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading } = useQuery<BankAccount[]>({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      const res = await fetch('/api/profile/bank-accounts');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/profile/bank-accounts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      setDeleteId(null);
    },
  });

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa tài khoản ngân hàng này?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  if (isLoading) {
    return (
      <Card>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Tài khoản ngân hàng
            </h2>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm tài khoản
          </button>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">Chưa có tài khoản ngân hàng nào</p>
            <p className="text-sm">Thêm tài khoản để nhận thanh toán</p>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {account.bankName}
                      </h3>
                      {account.isDefault && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Số tài khoản:</span>{' '}
                        {account.accountNumber}
                      </p>
                      <p>
                        <span className="font-medium">Chủ tài khoản:</span>{' '}
                        {account.accountHolder}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <BankAccountForm
          account={editingAccount}
          onClose={handleCloseForm}
        />
      )}
    </Card>
  );
}

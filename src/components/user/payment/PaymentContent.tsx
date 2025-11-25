'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
}

interface PaymentPageProps {
  bookingId: number;
  amount: number;
}

type PaymentStatus = 'pending' | 'success' | 'failed';

export default function PaymentPage({ bookingId, amount }: PaymentPageProps) {
  const router = useRouter();
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');

  const { data: bankAccounts = [], isLoading } = useQuery<BankAccount[]>({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      const res = await fetch('/api/profile/bank-accounts');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  // Poll payment status when using QR code
  useEffect(() => {
    if (paymentMethod !== 'qr' || paymentStatus !== 'pending') return;

    const checkPaymentStatus = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/payment-status`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'paid') {
            setPaymentStatus('success');
            setTimeout(() => {
              router.push(`/booking/${bookingId}`);
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Failed to check payment status:', error);
      }
    };

    const interval = setInterval(checkPaymentStatus, 3000);
    return () => clearInterval(interval);
  }, [bookingId, paymentMethod, paymentStatus, router]);

  const handleBankPayment = async () => {
    if (!selectedBankId) {
      alert('Vui lòng chọn tài khoản ngân hàng');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankAccountId: selectedBankId,
          amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPaymentStatus('success');
        setTimeout(() => {
          router.push(`/bookings/${bookingId}`);
        }, 2000);
      } else {
        setPaymentStatus('failed');
        setTimeout(() => {
          setPaymentStatus('pending');
        }, 3000);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setTimeout(() => {
        setPaymentStatus('pending');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/bookings/${bookingId}`);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h3>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thất bại!</h3>
          <p className="text-gray-600 mb-4">Vui lòng thử lại</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thanh toán đặt phòng</h1>
              <p className="text-gray-600 mt-1">Mã đặt phòng: #{bookingId}</p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tổng thanh toán:</span>
              <span className="text-3xl font-bold text-orange-600">
                {amount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${paymentMethod === 'qr'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Quét mã QR
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${paymentMethod === 'bank'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Tài khoản liên kết
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: QR Code or Bank Selection */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {paymentMethod === 'qr' ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Quét mã QR để thanh toán
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <div className="relative w-full max-w-sm mx-auto aspect-square">
                    <Image
                      src={'/images/qr/image.png'}
                      alt="QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang chờ thanh toán...</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Sử dụng ứng dụng ngân hàng để quét mã QR và thanh toán
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Chọn tài khoản thanh toán
                </h2>
                {bankAccounts.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Bạn chưa liên kết tài khoản ngân hàng nào
                    </p>
                    <button
                      onClick={() => router.push('/profile/bank-accounts')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Thêm tài khoản
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bankAccounts.map((account) => (
                      <label
                        key={account.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedBankId === account.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="bankAccount"
                          checked={selectedBankId === account.id}
                          onChange={() => setSelectedBankId(account.id)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {account.bankName}
                            </span>
                            {account.isDefault && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {account.accountNumber} - {account.accountHolder}
                          </p>
                        </div>
                      </label>
                    ))}
                    <Link href="/profile" passHref>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Thêm tài khoản thanh toán ở đây
                      </button>
                    </Link>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Instructions & Payment Info */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Hướng dẫn thanh toán
            </h3>

            {paymentMethod === 'qr' ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mở ứng dụng ngân hàng</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Mở ứng dụng Mobile Banking của ngân hàng bạn đang sử dụng
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quét mã QR</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Chọn chức năng quét QR và quét mã bên trái
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Xác nhận thanh toán</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Kiểm tra thông tin và xác nhận chuyển khoản
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Lưu ý:</strong> Hệ thống sẽ tự động xác nhận khi nhận được thanh toán.
                    Vui lòng không tắt trang này.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Chọn tài khoản</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Chọn tài khoản ngân hàng bạn muốn sử dụng để thanh toán
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Xác nhận thanh toán</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Nhấn nút "Thanh toán" và xác nhận giao dịch
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-900">
                    <strong>Lưu ý:</strong> Số tiền sẽ được trừ trực tiếp từ tài khoản ngân hàng
                    đã liên kết của bạn.
                  </p>
                </div>

                <button
                  onClick={handleBankPayment}
                  disabled={loading || !selectedBankId || bankAccounts.length === 0}
                  className="w-full mt-6 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Thanh toán {amount.toLocaleString('vi-VN')} VNĐ</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Quay lại trang đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
}

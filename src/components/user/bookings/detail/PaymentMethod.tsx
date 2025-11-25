'use client';
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Booking } from '@/types/Booking';
import { useTranslations } from 'next-intl';

interface PaymentMethodProps {
  booking: Booking;
  onBookingChange: (updatedFields: Partial<Booking>) => void;
}

export default function PaymentMethod({ booking, onBookingChange }: PaymentMethodProps) {
  const t = useTranslations('PaymentMethod');
  const router = useRouter();

  const handlePaymentClick = () => {
    if (booking.paymentStatus === 'paid') return;

    // Navigate to payment page
    router.push(`/bookings/${booking.id}/payment`);
  };

  const handleRetryPayment = () => {
    router.push(`/bookings/${booking.id}/payment`);
  };

  // Paid status
  if (booking.paymentStatus === 'paid') {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('title')}</h2>

        <div className="flex items-center p-6 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mr-4">
            <FaCheckCircle className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900">
              Đã thanh toán thành công
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Thanh toán vào lúc: {new Date(booking.paidAt!).toLocaleString('vi-VN')}
            </p>
            {booking.paymentMethod && (
              <p className="text-sm text-green-600 mt-1">
                Phương thức: {booking.paymentMethod === 'bank_transfer' ? 'Chuyển khoản ngân hàng' : 'Quét mã QR'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Failed status
  if (booking.paymentStatus === 'failed') {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('title')}</h2>

        <div className="space-y-4">
          <div className="flex items-center p-6 bg-red-50 border-2 border-red-500 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mr-4">
              <FaTimesCircle className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900">
                Thanh toán thất bại
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Vui lòng thử lại hoặc chọn phương thức thanh toán khác
              </p>
            </div>
          </div>

          <button
            onClick={handleRetryPayment}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Thử lại thanh toán
          </button>
        </div>
      </div>
    );
  }

  // Pending status - allow to proceed to payment
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('title')}</h2>

      <div className="space-y-4">
        <div
          onClick={handlePaymentClick}
          className="flex items-center p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-all cursor-pointer group"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="transfer"
            checked={booking.paymentMethod === 'transfer'}
            onChange={() => onBookingChange({ paymentMethod: 'transfer' })}
            className="w-5 h-5 text-orange-500 mr-4 cursor-pointer"
          />
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full mr-4">
            <FaCreditCard className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <label htmlFor="transfer" className="text-gray-900 font-medium cursor-pointer block">
              {t('transferPayment')}
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Chuyển khoản qua QR hoặc tài khoản liên kết
            </p>
          </div>
          <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </div>

        {booking.paymentMethod === 'transfer' && (
          <button
            onClick={handlePaymentClick}
            className="w-full px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Tiếp tục thanh toán
          </button>
        )}
      </div>
    </div>
  );
}

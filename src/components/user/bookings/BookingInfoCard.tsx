"use client";

import { Booking } from '@/types/Booking';
import { FiCalendar, FiUsers, FiMapPin } from 'react-icons/fi';

interface BookingInfoCardProps {
  booking: Booking;
}

export default function BookingInfoCard({ booking }: BookingInfoCardProps) {
  if (!booking.package) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="md:flex">
        {/* Package Image */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          {booking.package.images && booking.package.images.length > 0 ? (
            <img
              src={booking.package.images[0]}
              alt={booking.package.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <FiMapPin className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-green-700">
            {booking.status === 'completed' && 'Đã hoàn thành'}
          </div>
        </div>

        {/* Package Details */}
        <div className="md:w-3/5 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {booking.package.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {booking.package.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <FiMapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>{booking.package.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FiCalendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>
                {new Date(booking.checkIn).toLocaleDateString('vi-VN')} - {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FiUsers className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>{booking.numberOfTickets} khách</span>
            </div>
          </div>

          {booking.package.deadline && (
            <div className="mt-4 inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {booking.package.deadline} ngày
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

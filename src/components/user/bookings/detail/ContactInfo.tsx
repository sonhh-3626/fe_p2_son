'use client';

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { FaRegUser } from 'react-icons/fa6';
import { TfiEmail } from 'react-icons/tfi';
import { FiCalendar, FiPhone } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { LuTicketsPlane } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import FormField from '../../package-info/FormField';
import { Booking } from '@/types/Booking';
import TextAreaField from '../../package-info/TextAreaField';
import { updateBookingAPI } from '@/libs/api/bookings';

interface ContactInfoProps {
  booking: Booking;
  onBookingChange: (updatedFields: Partial<Booking>) => void;
}

export default function ContactInfo({ booking, onBookingChange }: ContactInfoProps) {
  const t = useTranslations('BookForm');
  const isReadOnly = booking.status === 'completed' || booking.status === 'cancelled';

  const bookFormSchema = z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().email(t('invalidEmail')),
    phone: z.string().min(10, t('phoneMinLength')).max(15, t('phoneMaxLength')),
    birthday: z.string().min(1, t('dateRequired')),
    message: z.string().optional(),
    numberOfTickets: z.number({ message: t('ticketsMustBeNumber') }).min(1, t('ticketsRequired'))
  })

  type BookFormData = z.infer<typeof bookFormSchema>;

  const [formData, setFormData] = useState<BookFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    birthday: '',
    numberOfTickets: 0,
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        message: booking.message,
        birthday: booking.birthday,
        numberOfTickets: booking.numberOfTickets,
      });
    }
  }, [booking]);

  const [errors, setErrors] = useState<z.ZodFormattedError<BookFormData> | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const formattedBirthday = () => {
    if (!formData.birthday) return '';
    const date = new Date(formData.birthday);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
  }

  const [remainingSlots, setRemainingSlots] = useState<number | null>(null);

  const checkPackageAvailability = async () => {
    if (!booking.package) {
      setMessage({ type: 'error', text: t('packageNotFound') });
      return false;
    }
    const packageId = booking.package.id;
    try {
      const response = await fetch(`/api/packages/${packageId}/check-availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageId,
          numberOfTickets: Number(formData.numberOfTickets),
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setMessage({ type: 'success', text: t('availabilitySuccess') });
        setRemainingSlots(result.remainingSlots);
        return true;
      } else {
        setRemainingSlots(result.remainingSlots ?? null);
        setMessage({ type: 'error', text: result.message + `. Chỉ còn lại ${remainingSlots} vé cho chuyến đi này.` });
        return false;
      }
    } catch (err) {
      setMessage({ type: 'error', text: t('availabilityError') });
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'numberOfTickets' ? Number(value) : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
    onBookingChange({ [name]: updatedValue } as Partial<Booking>);
    setErrors(null);
    setMessage(null);
  };

  const validateForm = () => {
    try {
      bookFormSchema.parse(formData);
      setErrors(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.format());
      }
      return false;
    }
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        const availability = await checkPackageAvailability();
        if(availability) {
          try {
            const updatedBookingResponse = await updateBookingAPI(booking.id, formData);
            if (updatedBookingResponse) {
              setMessage({ type: 'success', text: t('updateSuccess') });
              onBookingChange(formData);
            } else {
              setMessage({ type: 'error', text: t('updateFailed') });
            }
          } catch (error) {
            console.error('Failed to update booking:', error);
            setMessage({ type: 'error', text: t('updateFailed') });
          }
        }
      }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('bookThisTour')}</h2>
      <p className="text-gray-600 mb-8">
        {t('bookFormDescription')}
      </p>
      <form>
        <FormField
          label={t('namePlaceholder')}
          name="name"
          type="text"
          placeholder={t('namePlaceholder')}
          value={formData.name}
          onChange={handleChange}
          iconClass={<FaRegUser className='text-[#00000042]' />}
          errorMessage={errors?.name?._errors[0]}
          disabled={isReadOnly}
        />
        <FormField
          label={t('emailPlaceholder')}
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          value={formData.email}
          onChange={handleChange}
          iconClass={<TfiEmail className='text-[#00000042]' />}
          errorMessage={errors?.email?._errors[0]}
          disabled={isReadOnly}
        />
        <FormField
          label={t('phonePlaceholder')}
          name="phone"
          type="tel"
          placeholder={t('phonePlaceholder')}
          value={formData.phone}
          onChange={handleChange}
          iconClass={<FiPhone className='text-[#00000042]' />}
          errorMessage={errors?.phone?._errors[0]}
          disabled={isReadOnly}
        />
        <FormField
          label={t('datePlaceholder')}
          name="birthday"
          type="date"
          placeholder={t('datePlaceholder')}
          value={formattedBirthday()}
          onChange={handleChange}
          iconClass={<FiCalendar className='text-[#00000042]' />}
          errorMessage={errors?.birthday?._errors[0]}
          disabled={isReadOnly}
        />
        <FormField
          label={t('numberOfTicketsPlaceholder')}
          name="numberOfTickets"
          type="number"
          placeholder={t('numberOfTicketsPlaceholder')}
          value={formData.numberOfTickets.toString()}
          onChange={handleChange}
          iconClass={<LuTicketsPlane className='text-[#00000042]' />}
          errorMessage={errors?.numberOfTickets?._errors[0]}
          disabled={isReadOnly}
        />
        <TextAreaField
          label={t('messagePlaceholder')}
          name="message"
          placeholder={t('messagePlaceholder')}
          value={formData.message || ''}
          onChange={handleChange}
          iconClass={<AiOutlineMessage className='text-[#00000042]' />}
          errorMessage={errors?.message?._errors[0]}
          disabled={isReadOnly}
        />
        <div className="flex flex-col space-y-4">
          {message && (
            <div className={`p-3 rounded-md text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message.text}
            </div>
          )}
          {!isReadOnly && (
            <>
              <button
                type="submit"
                onClick={handleUpdateInfo}
                className="bg-[#DF6951] hover:bg-[#DF695126] text-white font-bold py-3 px-6 rounded-md cursor-pointer transition duration-300"
              >
                {t('updatePersonalInfo')}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import { FaRegUser } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LuTicketsPlane } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';

interface BookFormProps {
  packageId: number;
}

export default function BookForm({
  packageId,
}: BookFormProps) {
  const t = useTranslations('BookForm');
  const { data: session } = useSession();
  const router = useRouter();

  const bookFormSchema = z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().email(t('invalidEmail')),
    confirmEmail: z.string().email(t('invalidEmail')),
    phone: z.string().min(10, t('phoneMinLength')).max(15, t('phoneMaxLength')),
    birthday: z.string().min(1, t('dateRequired')),
    numberOfTickets: z.string().regex(/^\d+$/, t('ticketsMustBeNumber')).min(1, t('ticketsRequired')),
    message: z.string().optional(),
  }).refine((data) => data.email === data.confirmEmail, {
    message: t('emailsDoNotMatch'),
    path: ['confirmEmail'],
  });

  type BookFormData = z.infer<typeof bookFormSchema>;

  const [formData, setFormData] = useState<BookFormData>({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    birthday: '',
    numberOfTickets: '',
    message: '',
  });

  const [errors, setErrors] = useState<z.ZodFormattedError<BookFormData> | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [remainingSlots, setRemainingSlots] = useState<number | null>(null);
  const [alternativePackages, setAlternativePackages] = useState<any[]>([]);
  const [alternativeDates, setAlternativeDates] = useState<string[]>([]);
  const [loadingCheck, setLoadingCheck] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/profile/contact-info');
          if (response.ok) {
            const userData = await response.json();
            setFormData(prevData => ({
              ...prevData,
              name: userData.name || prevData.name,
              email: userData.email || prevData.email,
              phone: userData.phone || prevData.phone,
              birthday: userData.birthday || prevData.birthday,
              message: userData.message || prevData.message,
            }));
          } else {
            console.error("Failed to fetch user's last booking data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session?.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors(null);
    setMessage(null);
    setRemainingSlots(null);
    setAlternativePackages([]);
    setAlternativeDates([]);
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

  const checkPackageAvailability = async () => {
    try {
      setLoadingCheck(true);
      const response = await fetch(`/api/packages/${packageId}/check-availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          numberOfTickets: Number(formData.numberOfTickets),
        }),
      });

      const result = await response.json();
      setLoadingCheck(false);

      if (response.ok && result.ok) {
        setMessage({ type: 'success', text: t('availabilitySuccess') });
        setRemainingSlots(result.remainingSlots);
        return true;
      } else {
        setMessage({ type: 'error', text: result.message || t('availabilityError') });
        setRemainingSlots(result.remainingSlots ?? null);
        setAlternativePackages(result.alternatives ?? []);
        return false;
      }
    } catch (err) {
      setLoadingCheck(false);
      setMessage({ type: 'error', text: t('availabilityError') });
      return false;
    }
  };

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await checkPackageAvailability();
  };

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setMessage({ type: 'error', text: t('loginRequiredForBooking') });
      return;
    }
    if (!validateForm()) return;

    const isAvailable = await checkPackageAvailability();
    if (!isAvailable) {
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: Number(packageId),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthday: formData.birthday,
          numberOfTickets: parseInt(formData.numberOfTickets, 10),
          message: formData.message,
        }),
      });

      if (response.ok) {
        const bookingData = await response.json();
        setMessage({ type: 'success', text: t('bookSuccess') });
        router.push(`/bookings/${bookingData.booking.id}`);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || t('bookError') });
      }
    } catch {
      setMessage({ type: 'error', text: t('bookError') });
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('bookThisTour')}</h2>
      <p className="text-gray-600 mb-8">{t('bookFormDescription')}</p>

      <form>
        <FormField name="name" type="text" placeholder={t('namePlaceholder')}
          value={formData.name} onChange={handleChange}
          iconClass={<FaRegUser className="text-[#00000042]" />}
          errorMessage={errors?.name?._errors[0]}
        />

        <FormField name="email" type="email" placeholder={t('emailPlaceholder')}
          value={formData.email} onChange={handleChange}
          iconClass={<TfiEmail className="text-[#00000042]" />}
          errorMessage={errors?.email?._errors[0]}
        />

        <FormField name="confirmEmail" type="email" placeholder={t('confirmEmailPlaceholder')}
          value={formData.confirmEmail} onChange={handleChange}
          iconClass={<TfiEmail className="text-[#00000042]" />}
          errorMessage={errors?.confirmEmail?._errors[0]}
        />

        <FormField name="phone" type="tel" placeholder={t('phonePlaceholder')}
          value={formData.phone} onChange={handleChange}
          iconClass={<FiPhone className="text-[#00000042]" />}
          errorMessage={errors?.phone?._errors[0]}
        />

        <FormField name="birthday" type="date" placeholder={t('datePlaceholder')}
          value={formData.birthday} onChange={handleChange}
          iconClass={<MdOutlineCalendarMonth className="text-[#00000042]" />}
          errorMessage={errors?.birthday?._errors[0]}
        />

        <FormField name="numberOfTickets" type="text" placeholder={t('numberOfTicketsPlaceholder')}
          value={formData.numberOfTickets} onChange={handleChange}
          iconClass={<LuTicketsPlane className="text-[#00000042]" />}
          errorMessage={errors?.numberOfTickets?._errors[0]}
        />

        <TextAreaField name="message" placeholder={t('messagePlaceholder')}
          value={formData.message || ''} onChange={handleChange}
          iconClass={<AiOutlineMessage className="text-[#00000042]" />}
          errorMessage={errors?.message?._errors[0]}
        />

        {message && (
          <div className={`p-3 mt-4 rounded-md text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message.text}
          </div>
        )}

        {remainingSlots !== null && (
          <Card className="mt-4">
            <p>
              {t('packageAvailability')}
            </p>
            <p className="font-semibold">
              {t('availableSlots')}: {remainingSlots}
            </p>
          </Card>
        )}

        {alternativeDates.length > 0 && (
          <div className="mt-4 p-4 border rounded bg-white">
            <h3 className="font-bold mb-2 text-blue-700">Suggested Available Dates</h3>

            {alternativeDates.map((d) => (
              <label key={d} className="flex items-center space-x-2 mb-1">
                <input
                  type="checkbox"
                  onChange={() => setFormData({ ...formData, birthday: d })}
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
        )}

        {alternativePackages.length > 0 && (
          <div className="mt-6 p-4 bg-white shadow rounded">
            <h3 className="font-bold text-red-600 mb-3">Alternative Packages</h3>
            <ul className="space-y-2">
              {alternativePackages.map((p) => (
                <li key={p.id} className="border p-3 rounded">
                  <p className="font-semibold">{p.title}</p>
                  <p>Remaining: {p.remainingSlots}</p>
                  <button
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => router.push(`/packages/${p.id}`)}
                  >
                    View Package
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col space-y-4 mt-6">
          <button
            type="submit"
            onClick={handleCheckAvailability}
            disabled={loadingCheck}
            className="bg-[#DF6951] hover:bg-[#DF695126] text-white font-bold py-3 px-6 rounded-md transition disabled:opacity-50"
          >
            {loadingCheck ? 'Checking...' : t('checkAvailability')}
          </button>

          <button
            type="submit"
            onClick={handleBookNow}
            className="bg-[#DF6951] hover:bg-[#DF695126] text-white font-bold py-3 px-6 rounded-md transition"
          >
            {t('bookNow')}
          </button>
        </div>
      </form>
    </div>
  );
}

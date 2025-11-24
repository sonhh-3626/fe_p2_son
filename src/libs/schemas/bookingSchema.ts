import { z } from 'zod';

export const bookingSchema = (t: any) => {
  return z.object({
    packageId: z.number({ message: t('packageIdNumber') }),
    name: z.string().min(1, t('nameRequired')),
    email: z.string().email(t('invalidEmail')),
    phone: z.string().min(10, t('phoneMinLength')).max(15, t('phoneMaxLength')),
    date: z.string().min(1, t('dateRequired')),
    numberOfTickets: z.number({ message: t('ticketsNumber') }).min(1, t('ticketsRequired')),
    message: z.string().optional(),
  });
};

export type BookingRequestData = z.infer<ReturnType<typeof bookingSchema>>;

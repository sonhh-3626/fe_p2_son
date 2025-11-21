import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Providers from '@/components/auth/Provider';
import { QueryProviders } from './providers';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProviders>
            <Providers>
              {children}
            </Providers>
          </QueryProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

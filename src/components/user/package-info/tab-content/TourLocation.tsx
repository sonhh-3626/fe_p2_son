import { useTranslations } from 'next-intl';

interface TourLocationProps {
  mapUrl: string;
}

export default function TourLocation({
  mapUrl
}: TourLocationProps) {
  const t = useTranslations('TourLocation');

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-lg mb-4">
        {t('description1')}
      </p>
      <div className="relative h-96 w-full mb-8">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('mapTitle')}
        ></iframe>
      </div>
      <p className="text-lg mb-4">
        {t('description2')}
      </p>
      <p className="text-lg">
        {t('description3')}
      </p>
    </div>
  );
}

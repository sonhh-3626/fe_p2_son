import { MapPin } from 'lucide-react';

interface PackageInfoProps {
  img: string;
  title: string;
  destination: string;
}

export default function PackageInfo({ img, title, destination }: PackageInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={img}
        alt={title}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {destination}
        </div>
      </div>
    </div>
  );
}

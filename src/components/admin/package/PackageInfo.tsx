import Image from 'next/image';

interface PackageInfoProps {
  img: string;
  title: string;
  description: string;
}

export default function PackageInfo({ img, title, description }: PackageInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={img}
        alt={title}
        width={64}
        height={64}
        quality={100}
        priority={true}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}

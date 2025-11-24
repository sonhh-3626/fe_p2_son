import { Package } from '@/types/Package';
import TourInformation from './TourInformation';
import TourPlan from './TourPlan';
import TourLocation from './TourLocation';
import GalleryContent from './GalleryContent';

interface TabContentProps {
  active: number;
  packageData: Package;
}

export function TabContent({ active, packageData }: TabContentProps) {
  const tabs = [
    {
      id: 0,
      content: (
        <TourInformation
          title={packageData.title}
          price={packageData.price}
          reviews={packageData.reviews}
          description={packageData.description}
          destination={packageData.destination}
          departure={packageData.departure}
          departureTime={packageData.departureTime}
          returnTime={packageData.returnTime}
          dressCode={packageData.dressCode}
          notIncluded={packageData.notIncluded}
          included={packageData.included}
        />
      ),
    },
    {
      id: 1,
      content: <TourPlan packagePlans={packageData.packagePlans} />,
    },
    {
      id: 2,
      content: <TourLocation mapUrl={packageData.mapUrl} />,
    },
    {
      id: 3,
      content: <GalleryContent />,
    },
  ];

  return (
    <div className="mt-6 p-4 text-gray-700">
      {tabs.map((tab) => (
        <div key={tab.id}>
          {active === tab.id && tab.content}
        </div>
      ))}
    </div>
  );
}

import BasicInfoTab from './tabs/BasicInfoTab';
import TourDetailsTab from './tabs/TourDetailsTab';
import ItineraryTab from './tabs/ItineraryTab';
import ImagesMapTab from './tabs/ImagesMapTab';

export default function PackageFormBody({ activeTab, control, errors, watch }: any) {

  const TAB_COMPONENTS = [
    <BasicInfoTab control={control} errors={errors} watch={watch} />,
    <TourDetailsTab control={control} errors={errors} />,
    <ItineraryTab control={control} errors={errors} />,
    <ImagesMapTab control={control} watch={watch} />,
  ];

  return (
    <div className="p-8 overflow-y-auto grow">
      {TAB_COMPONENTS[activeTab]}
    </div>
  );
}

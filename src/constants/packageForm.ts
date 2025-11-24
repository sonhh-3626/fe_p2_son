import { IconType } from 'react-icons';
import { FiList, FiActivity, FiCalendar, FiImage } from 'react-icons/fi';

export interface Tab {
  id: number;
  label: string;
  icon: IconType;
}

export const PACKAGE_FORM_TABS: Tab[] = [
  { id: 0, label: 'Thông tin cơ bản', icon: FiList },
  { id: 1, label: 'Chi tiết Tour', icon: FiActivity },
  { id: 2, label: 'Lịch trình', icon: FiCalendar },
  { id: 3, label: 'Hình ảnh & Map', icon: FiImage }
];

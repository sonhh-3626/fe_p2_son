export interface PackagePlans {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Package {
  id: number;
  title: string;
  price: number;
  rating: number;
  img: string;
  images: string[];
  deadline: string;
  participants: number;
  shortDescription: string;
  packagePlans: PackagePlans[];
  reviews: number;
  description: string;
  destination: string;
  departure: string;
  departureTime: string;
  returnTime: string;
  dressCode: string;
  notIncluded: string[];
  included: string[];
  location: string;
  mapUrl: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render: (item: T) => React.ReactNode;
  headerAlign?: 'left' | 'center' | 'right';
  cellAlign?: 'left' | 'center' | 'right';
  width?: string;
}

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_PRICE_MAX,
  DEFAULT_PRICE_MIN,
  DEFAULT_SORT_TYPE
} from '@/constants/packages';
import { Package } from '@/types/Package';

export async function fetchPackages(
  sortType: string = DEFAULT_SORT_TYPE,
  priceMin: number = DEFAULT_PRICE_MIN,
  priceMax: number = DEFAULT_PRICE_MAX,
  search: string = '',
  where: string = '',
  date: string = '',
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
) {
  const params = new URLSearchParams({
    sortType,
    priceMin: priceMin.toString(),
    priceMax: priceMax.toString(),
    search,
    where,
    date: date,
    page: page.toString(),
    limit: limit.toString(),
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/packages?${params.toString()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      return null;
    }

    return await response.json();

  } catch (error: any) {
    if (error.name === 'TypeError') {
      console.error('Network error or CORS:', error.message);
    } else if (error.message?.includes('Failed to fetch')) {
      console.error('No internet connection');
    } else {
      console.error('Unknown error:', error.message);
    }
    return null;
  }
}

export async function fetchPackageData(id: string): Promise<Package | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/package/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Package = await response.json();
    return data;
  } catch (e) {
    console.error('Error fetching package:', e);
    return null;
  }
}

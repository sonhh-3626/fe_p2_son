import { User } from '@/types/User';

export async function fetchUsers(): Promise<User[] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/admin/users`, {
      cache: 'no-store',
    });

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

import { PasswordFormData, ProfileFormData } from '@/lib/types';
import { User } from '@/types/User';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Yêu cầu thất bại');
  }

  return result.data as T;
}

export async function fetchUserProfile(): Promise<User> {
  return request<User>('/api/profile');
}

export async function updateProfile(data: ProfileFormData): Promise<User> {
  return request<User>('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updateAvatar(avatarData: string): Promise<User> {
  return request<User>('/api/avatar', {
    method: 'PUT',
    body: JSON.stringify({ avatar: avatarData }),
  });
}

export async function changePassword(data: PasswordFormData): Promise<void> {
  return request<void>('/api/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

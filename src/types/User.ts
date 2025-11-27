export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  status: 'active' | 'inactive';
  birthday?: string;
}

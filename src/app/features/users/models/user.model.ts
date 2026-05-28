export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  image: string;
}

import { UserRole, UserStatus } from 'generated/prisma';

export interface Users {
  name: string;
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
}

export interface UserResponse {
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
}

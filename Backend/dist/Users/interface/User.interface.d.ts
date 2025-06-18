import { UserRole } from 'generated/prisma';
export interface Users {
    name: string;
    id: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserResponse {
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

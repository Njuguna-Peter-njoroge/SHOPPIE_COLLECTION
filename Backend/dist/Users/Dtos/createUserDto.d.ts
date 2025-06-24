import { UserRole, UserStatus } from 'generated/prisma';
import 'reflect-metadata';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    status: UserStatus;
}

import { UserStatus } from './../../../generated/prisma/index.d';
import { UserRole } from 'generated/prisma';
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    status: UserStatus;
}

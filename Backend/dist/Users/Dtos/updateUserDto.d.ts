import { UserRole } from 'generated/prisma';
export declare class updateUserDto {
    name: string;
    email: string;
    password: string;
    b: any;
    role?: UserRole;
}

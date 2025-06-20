import { Decimal } from 'generated/prisma/runtime/library';
export declare class updateProductDto {
    name: string;
    email: string;
    description: string;
    price?: Decimal;
    stock: number;
}

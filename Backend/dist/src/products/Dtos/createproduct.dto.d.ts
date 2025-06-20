import { ProductStatus } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';
export declare class createProductDto {
    name: string;
    description: string;
    price: Decimal;
    imageUrl: string;
    stock: number;
    status: ProductStatus;
}

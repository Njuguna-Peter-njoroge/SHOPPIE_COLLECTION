import { ProductStatus } from 'generated/prisma';
export declare class createProductDto {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: string;
    status: ProductStatus;
}

import { ProductStatus } from 'generated/prisma';
export declare class ProductResponseDto {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    status: ProductStatus;
}

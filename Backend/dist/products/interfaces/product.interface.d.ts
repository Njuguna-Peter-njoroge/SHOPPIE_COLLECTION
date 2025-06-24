import { Product, ProductStatus } from './../../../generated/prisma/index.d';
import { Decimal } from 'generated/prisma/runtime/library';
export interface Products {
    id: string;
    name: string;
    description: string;
    price: Decimal;
    imageUrl: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    status: ProductStatus;
}
export interface ProductListResponse {
    status: 'success' | 'error';
    message: string;
    data: Product[];
}

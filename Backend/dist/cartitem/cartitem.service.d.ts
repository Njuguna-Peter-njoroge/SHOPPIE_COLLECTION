import { PrismaService } from '../prisma/prisma.service';
import { ApiResponseService } from 'src/Shared/api-response.products.interface';
export declare class CartItemService {
    private readonly prisma;
    private readonly apiResponse;
    constructor(prisma: PrismaService, apiResponse: ApiResponseService);
    getCart(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        statusCode: number;
        message: string;
        error: string | undefined;
    }>;
    addToCart(userId: string, productId: string, quantity?: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        statusCode: number;
        message: string;
        error: string | undefined;
    }>;
    removeFromCart(itemId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        statusCode: number;
        message: string;
        error: string | undefined;
    }>;
}

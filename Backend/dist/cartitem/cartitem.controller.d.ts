import { CartItemService } from './cartitem.service';
import { CreateCartItemDto } from '../products/interfaces/cartitem';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    addToCart(body: CreateCartItemDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        statusCode: number;
        message: string;
        error: string | undefined;
    }>;
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
}

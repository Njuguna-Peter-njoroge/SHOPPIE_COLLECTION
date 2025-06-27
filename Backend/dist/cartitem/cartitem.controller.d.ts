import { CartItemService } from './cartitem.service';
import { AddToCartDto } from './dtos/addtocart.dto';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    addToCart(userId: string, dto: AddToCartDto): Promise<{
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

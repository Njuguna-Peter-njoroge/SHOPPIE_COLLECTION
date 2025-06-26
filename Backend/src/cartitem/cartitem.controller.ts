import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartItemService } from './cartitem.service';
import { CreateCartItemDto } from '../products/interfaces/cartitem';

@Controller('cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('add')
  async addToCart(@Body() body: CreateCartItemDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    return this.cartItemService.addToCart(
      body.userId,
      body.productId,
      body.quantity || 1,
    );
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartItemService.getCart(userId);
  }
}

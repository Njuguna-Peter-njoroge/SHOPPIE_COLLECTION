// src/cart/cartitem.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cartitem.service';
import { AddToCartDto } from './dtos/addtocart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('add/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addToCart(@Param('userId') userId: string, @Body() dto: AddToCartDto) {
    return this.cartItemService.addToCart(userId, dto.productId, dto.quantity);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartItemService.getCart(userId);
  }

  @Delete('items/:itemId')
  async removeFromCart(@Param('itemId') itemId: string) {
    return this.cartItemService.removeFromCart(itemId);
  }
}

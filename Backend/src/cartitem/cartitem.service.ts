// src/cart/cartitem.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponseService } from 'src/Shared/api-response.products.interface';

@Injectable()
export class CartItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly apiResponse: ApiResponseService,
  ) {}

  async getCart(userId: string) {
    try {
      let cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  price: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId,
            totalPrice: '0',
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      return this.apiResponse.ok(cart, 'Cart retrieved successfully');
    } catch (error) {
      return this.apiResponse.serverError(
        'Failed to retrieve cart',
        500,
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product || product.status !== 'AVAILABLE') {
        throw new NotFoundException('Product not found or not available');
      }

      let cart = await this.prisma.cart.findFirst({ where: { userId } });
      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId,
            totalPrice: '0',
          },
        });
      }

      const existingItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (existingItem) {
        await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
          },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            userId,
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }

      return this.getCart(userId); // return updated cart
    } catch (error) {
      return this.apiResponse.serverError(
        'Failed to add to cart',
        500,
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}

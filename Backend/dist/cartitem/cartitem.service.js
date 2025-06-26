"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_response_products_interface_1 = require("../Shared/api-response.products.interface");
let CartItemService = class CartItemService {
    prisma;
    apiResponse;
    constructor(prisma, apiResponse) {
        this.prisma = prisma;
        this.apiResponse = apiResponse;
    }
    async getCart(userId) {
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
            }
            return this.apiResponse.ok(cart, 'Cart retrieved successfully');
        }
        catch (error) {
            return this.apiResponse.serverError('Failed to retrieve cart', 500, error instanceof Error ? error.message : String(error));
        }
    }
    async addToCart(userId, productId, quantity = 1) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (!product || product.status !== 'AVAILABLE') {
                throw new common_1.NotFoundException('Product not found or not available');
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
            }
            else {
                await this.prisma.cartItem.create({
                    data: {
                        userId: String(userId),
                        cartId: cart.id,
                        productId,
                        quantity,
                    },
                });
            }
            return this.getCart(userId);
        }
        catch (error) {
            return this.apiResponse.serverError('Failed to add to cart', 500, error instanceof Error ? error.message : String(error));
        }
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        api_response_products_interface_1.ApiResponseService])
], CartItemService);
//# sourceMappingURL=cartitem.service.js.map
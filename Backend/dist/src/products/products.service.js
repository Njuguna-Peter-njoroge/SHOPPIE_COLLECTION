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
exports.ProductsService = void 0;
const prisma_1 = require("generated/prisma");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma/prisma.service");
const library_1 = require("generated/prisma/runtime/library");
let ProductsService = class ProductsService {
    Prisma;
    constructor(Prisma) {
        this.Prisma = Prisma;
    }
    async create(data) {
        if (!prisma_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('only admins can create a product');
        }
        try {
            const existingProduct = await this.Prisma.product.findFirst({
                where: { name: data.name },
            });
            if (existingProduct) {
                throw new common_1.ConflictException('A product with this name already exists');
            }
            const Product = await this.Prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: new library_1.Decimal(data.price),
                    stock: data.stock,
                    imageUrl: data.imageUrl,
                },
            });
            const productListResponse = {
                id: Product.id,
                name: Product.name,
                description: Product.description,
                price: Product.price.toString(),
                stock: Product.stock,
                imageUrl: Product.imageUrl,
                createdAt: Product.createdAt,
                updatedAt: Product.updatedAt,
                status: data.status ?? 'AVAILABLE',
            };
            return {
                success: true,
                message: 'product created successfully',
                data: productListResponse,
            };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'p2002') {
                    throw new common_1.BadRequestException('email already exists');
                }
            }
            {
                throw new common_1.BadRequestException('failed to create User');
            }
        }
    }
    async findAll() {
        try {
            return await this.Prisma.product.findMany();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('Failed to fetch products');
        }
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('product id is required');
        }
        const product = await this.Prisma.product.findUnique({
            where: { id },
        });
        if (!product || !user.AVAILABLE) {
            throw new common_1.BadRequestException('product not found');
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map
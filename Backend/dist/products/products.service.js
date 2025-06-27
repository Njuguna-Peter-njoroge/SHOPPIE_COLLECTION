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
const prisma_1 = require("../../generated/prisma/index.js");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("../../generated/prisma/runtime/library");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
let ProductsService = class ProductsService {
    Prisma;
    constructor(Prisma) {
        this.Prisma = Prisma;
    }
    async uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'shoppie_products' }, (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    reject(new Error('Failed to upload image to Cloudinary'));
                }
                else {
                    const cloudinaryResult = result;
                    console.log('✅ Cloudinary Upload Success:', cloudinaryResult);
                    resolve(cloudinaryResult);
                }
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async create(data) {
        if (prisma_1.UserRole.ADMIN !== prisma_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can create a product');
        }
        try {
            const existingProduct = await this.Prisma.product.findFirst({
                where: { name: data.name },
            });
            if (existingProduct) {
                throw new common_1.ConflictException('A product with this name already exists');
            }
            const product = await this.Prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: new library_1.Decimal(data.price),
                    stock: data.stock,
                    imageUrl: data.imageUrl,
                    category: data.category,
                },
            });
            const response = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                stock: product.stock,
                imageUrl: product.imageUrl,
                category: product.category,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                status: data.status ?? 'AVAILABLE',
            };
            return {
                success: true,
                message: 'Product created successfully',
                data: response,
            };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Product already exists');
                }
            }
            throw new common_1.BadRequestException('Failed to create product');
        }
    }
    async findAll() {
        try {
            const products = await this.Prisma.product.findMany();
            return products.map((product) => ({
                success: true,
                message: 'Product fetched successfully',
                data: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price.toString(),
                    stock: product.stock,
                    imageUrl: product.imageUrl,
                    category: product.category,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    status: product.status,
                },
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Failed to fetch products');
        }
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.ForbiddenException('Product ID required');
        }
        const product = await this.Prisma.product.findUnique({
            where: { id },
        });
        if (!product || product.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Product not found or not available');
        }
        const response = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock,
            imageUrl: product.imageUrl,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            status: product.status,
        };
        return {
            success: true,
            message: 'Product retrieved successfully',
            data: response,
        };
    }
    async findByName(name) {
        if (!name) {
            throw new common_1.ForbiddenException('Product name required');
        }
        const product = await this.Prisma.product.findFirst({
            where: { name },
        });
        if (!product || product.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Product not found or not available');
        }
        const response = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock,
            imageUrl: product.imageUrl,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            status: product.status,
        };
        return {
            success: true,
            message: 'Product retrieved successfully',
            data: response,
        };
    }
    async updateProduct(id, data) {
        try {
            const updated = await this.Prisma.product.update({
                where: { id },
                data: {
                    ...data,
                    price: data.price ? new library_1.Decimal(data.price) : undefined,
                },
            });
            const response = {
                id: updated.id,
                name: updated.name,
                description: updated.description,
                price: updated.price.toString(),
                stock: updated.stock,
                imageUrl: updated.imageUrl,
                category: updated.category,
                createdAt: updated.createdAt,
                updatedAt: updated.updatedAt,
                status: updated.status,
            };
            return {
                success: true,
                message: 'Product updated successfully',
                data: response,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update product');
        }
    }
    async deleteProduct(id) {
        if (!id) {
            throw new common_1.ForbiddenException('Product ID is required');
        }
        const product = await this.Prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        try {
            await this.Prisma.product.delete({ where: { id } });
            return {
                success: true,
                message: 'Product deleted successfully',
                data: { message: 'Product deleted successfully' },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete product');
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map
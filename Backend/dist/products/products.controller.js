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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const createproduct_dto_1 = require("./Dtos/createproduct.dto");
const updateproduct_dto_1 = require("./Dtos/updateproduct.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    ProductsService;
    constructor(ProductsService) {
        this.ProductsService = ProductsService;
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            const result = await this.ProductsService.uploadToCloudinary(file);
            return {
                success: true,
                message: 'Image uploaded successfully',
                imageUrl: result.secure_url,
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : JSON.stringify(error);
            throw new common_1.BadRequestException('Failed to upload image: ' + message);
        }
    }
    async uploadAndCreateProduct(file, productData) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            const result = await this.ProductsService.uploadToCloudinary(file);
            if (!result.secure_url) {
                throw new Error('Image upload did not return a secure_url');
            }
            const dataWithImageUrl = {
                ...productData,
                imageUrl: result.secure_url,
            };
            return await this.ProductsService.create(dataWithImageUrl);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : JSON.stringify(error);
            throw new common_1.BadRequestException('Failed to create product: ' + message);
        }
    }
    async create(data) {
        return this.ProductsService.create(data);
    }
    async findAll() {
        try {
            return await this.ProductsService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error retrieving products');
        }
    }
    async findOne(id) {
        try {
            return await this.ProductsService.findOne(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error retrieving product');
        }
    }
    async findByName(name) {
        try {
            return await this.ProductsService.findByName(name);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error
                ? error.message
                : 'Error retrieving product by name');
        }
    }
    async update(id, updateProductDto) {
        return this.ProductsService.updateProduct(id, updateProductDto);
    }
    async remove(id) {
        return this.ProductsService.deleteProduct(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload-and-create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createproduct_dto_1.createProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadAndCreateProduct", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createproduct_dto_1.createProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('by-name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateproduct_dto_1.updateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map
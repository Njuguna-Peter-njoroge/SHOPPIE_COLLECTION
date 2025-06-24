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
const createproduct_dto_1 = require("./Dtos/createproduct.dto");
const products_service_1 = require("./products.service");
const common_1 = require("@nestjs/common");
const updateproduct_dto_1 = require("./Dtos/updateproduct.dto");
let ProductsController = class ProductsController {
    ProductsService;
    constructor(ProductsService) {
        this.ProductsService = ProductsService;
    }
    async create(data) {
        return this.ProductsService.create(data);
    }
    async findAll() {
        try {
            return await this.ProductsService.findAll();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('error retrieving products');
        }
    }
    async findOne(id) {
        try {
            return await this.ProductsService.findOne(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('error retrieving products');
        }
    }
    async findByName(name) {
        try {
            return await this.ProductsService.findByName(name);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('error retrieving products');
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
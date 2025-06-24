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
exports.updateProductDto = void 0;
const class_validator_1 = require("class-validator");
const library_1 = require("../../../generated/prisma/runtime/library");
class updateProductDto {
    name;
    email;
    description;
    price;
    stock;
}
exports.updateProductDto = updateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'name must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'name must be at least 8 characters long' }),
    (0, class_validator_1.MaxLength)(15, { message: 'name must not be more than 15 characters long' }),
    __metadata("design:type", String)
], updateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'email be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'email must be at least 8 characters long' }),
    (0, class_validator_1.MaxLength)(20, { message: 'email must not exceed 20 characters' }),
    (0, class_validator_1.IsEmail)({}, { message: 'please provide a valid email' }),
    __metadata("design:type", String)
], updateProductDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'must be a string' }),
    __metadata("design:type", String)
], updateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d+(\.\d{1,2})?$/, {
        message: 'Price must be a valid decimal (e.g. 19.99)',
    }),
    __metadata("design:type", library_1.Decimal)
], updateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'must be a greater than 0' }),
    __metadata("design:type", Number)
], updateProductDto.prototype, "stock", void 0);
//# sourceMappingURL=updateproduct.dto.js.map
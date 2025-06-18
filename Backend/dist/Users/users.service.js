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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("../../generated/prisma/runtime/library");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    Prisma;
    constructor(Prisma) {
        this.Prisma = Prisma;
    }
    async create(data) {
        if (!data.password) {
            throw new common_1.BadRequestException('password is required');
        }
        if (data.password.length < 8) {
            throw new common_1.BadRequestException('password must be at least of 8 characters');
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        try {
            const user = await this.Prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                },
            });
            const UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: 'CUSTOMER',
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                success: true,
                message: 'user created successfully',
                data: UserResponse,
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
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
const bcrypt = require("bcryptjs");
const prisma_1 = require("../../generated/prisma/index.js");
let UsersService = class UsersService {
    Prisma;
    remove() {
        throw new Error('Method not implemented.');
    }
    constructor(Prisma) {
        this.Prisma = Prisma;
    }
    sanitizeUser(user) {
        const { password, ...rest } = user;
        return rest;
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
                status: data.status ?? 'ACTIVE',
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
    async findAll(options = {}) {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;
        const [users] = await Promise.all([
            this.Prisma.user.findMany({
                where: { isActive: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.Prisma.user.count({ where: { isActive: true } }),
        ]);
        return {
            success: true,
            message: 'Users retrieved successfully',
            data: users.map((user) => this.sanitizeUser(user)),
        };
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        const user = await this.Prisma.user.findUnique({
            where: { id },
        });
        if (!user || !user.isActive) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            success: true,
            message: 'User retrieved successfully',
            data: this.sanitizeUser(user),
        };
    }
    async getById(id) {
        return this.findOne(id);
    }
    async findByEmail(email) {
        const user = await this.Prisma.user.findUnique({
            where: { email },
        });
        if (!user || !user.isActive) {
            throw new common_1.NotFoundException('user not found');
        }
        return {
            success: true,
            message: 'User retrieved successfully',
            data: this.sanitizeUser(user),
        };
    }
    async update(id, data) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        const existingUser = await this.Prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser || !existingUser.isActive) {
            throw new common_1.NotFoundException('User not found');
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.email)
            updateData.email = data.email;
        try {
            const updatedUser = await this.Prisma.user.update({
                where: { id },
                data: updateData,
            });
            return {
                success: true,
                message: 'User updated successfully',
                data: this.sanitizeUser(updatedUser),
            };
        }
        catch (error) {
            if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Email already exists');
                }
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('User not found');
                }
            }
            throw new common_1.BadRequestException('Failed to update user');
        }
    }
    async deleteUser(id) {
        if (!id) {
            throw new common_1.BadRequestException('use id is required');
        }
        try {
            const user = await this.Prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            await this.Prisma.user.update({
                where: { id },
                data: { isActive: false },
            });
            return {
                success: true,
                message: 'User deactivated successfully',
                data: { message: 'User deactivated successfully' },
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to deactivate user');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
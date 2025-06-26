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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const mailer_1 = require("@nestjs-modules/mailer");
const library_1 = require("@prisma/client/runtime/library");
let UsersService = UsersService_1 = class UsersService {
    prisma;
    mailerService;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(prisma, mailerService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
    }
    sanitizeUser(user) {
        const { password, ...rest } = user;
        return rest;
    }
    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email.toLowerCase(),
                    password: hashedPassword,
                    role: data.role || 'CUSTOMER',
                    status: data.status || 'ACTIVE',
                },
            });
            try {
                await this.mailerService.sendMail({
                    to: user.email,
                    subject: 'Welcome to Shoppie Collection!',
                    template: 'welcome',
                    context: {
                        name: user.name,
                        storeName: 'Shoppie Collection',
                        loginUrl: 'https://your-site.com/login',
                        supportEmail: 'support@your-site.com',
                        currentYear: new Date().getFullYear(),
                    },
                });
            }
            catch (error) {
                this.logger.error('Failed to send welcome email:', error);
            }
            return {
                success: true,
                message: 'User created successfully',
                data: this.sanitizeUser(user),
            };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Email already exists');
                }
                throw new common_1.BadRequestException(`Database error: ${error.message}`);
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred');
        }
    }
    async findAll(paginationOptions) {
        const users = await this.prisma.user.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        return {
            success: true,
            message: 'Users retrieved successfully',
            data: users.map((user) => this.sanitizeUser(user)),
        };
    }
    async findOne(id) {
        if (!id)
            throw new common_1.BadRequestException('User ID is required');
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user || !user.isActive) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            success: true,
            message: 'User retrieved successfully',
            data: this.sanitizeUser(user),
        };
    }
    async findByEmail(email) {
        if (!email)
            throw new common_1.BadRequestException('Email is required');
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
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
    async update(id, data) {
        if (!id)
            throw new common_1.BadRequestException('User ID is required');
        const existingUser = await this.prisma.user.findUnique({ where: { id } });
        if (!existingUser || !existingUser.isActive) {
            throw new common_1.NotFoundException('User not found');
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.email)
            updateData.email = data.email;
        try {
            const updatedUser = await this.prisma.user.update({
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
            if (error instanceof library_1.PrismaClientKnownRequestError) {
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
        if (!id)
            throw new common_1.BadRequestException('User ID is required');
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
        return {
            success: true,
            message: 'User deactivated successfully',
            data: { message: 'User deactivated successfully' },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map
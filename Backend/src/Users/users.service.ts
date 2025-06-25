/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './Dtos/createUserDto';
import { UserResponseDto } from './Dtos/userResponse.Dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import * as bcrypt from 'bcryptjs';
import { Prisma, UserRole, type User } from 'generated/prisma';
import { updateUserDto } from './Dtos/updateUserDto';
import { MailerService } from '@nestjs-modules/mailer';

interface PaginationOptions {
  page?: number;
  limit?: number;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
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

      const userResponse: UserResponseDto = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
      };

      try {
        await this.mailerService.sendMail({
          to: user.email,
          subject: 'Welcome to our platform!',
          template: './welcome',
          context: {
            name: user.name,
          },
        });
      } catch (error) {
        this.logger.error('Failed to send welcome email:', error);
      }

      return {
        success: true,
        message: 'User created successfully',
        data: userResponse,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists');
        }
        throw new BadRequestException(`Database error: ${error.message}`);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  remove(id: string): ApiResponse<{ message: string }> {
    throw new Error('Method not implemented.');
  }

  private sanitizeUser(user: User): UserResponseDto {
    const { password, ...rest } = user;
    return rest as UserResponseDto;
  }

  // find all users
  async findAll(
    options: PaginationOptions = {},
  ): Promise<ApiResponse<UserResponseDto[]>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [users] = await Promise.all([
      this.prisma.user.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { isActive: true } }),
    ]);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users.map((user) => this.sanitizeUser(user)),
    };
  }

  // find one user
  async findOne(id: string): Promise<ApiResponse<UserResponseDto>> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      message: 'User retrieved successfully',
      data: this.sanitizeUser(user),
    };
  }

  // get by id
  async getById(id: string): Promise<ApiResponse<UserResponseDto>> {
    return this.findOne(id);
  }

  // find by email
  async findByEmail(email: string): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('user not found');
    }

    return {
      success: true,
      message: 'User retrieved successfully',
      data: this.sanitizeUser(user),
    };
  }

  //  update user credentials
  async update(
    id: string,
    data: updateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser || !existingUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;

    // if (data.password) {
    //   if (data.password.length < 8) {
    //     throw new BadRequestException(
    //       'Password must be at least 8 characters long',
    //     );
    //   }
    //   updateData.password = await bcrypt.hash(data.password, 12);
    // }
    // if (data.role && !Object.values(UserRole).includes(data.role)) {
    //   throw new BadRequestException('Invalid role');
    // }

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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      throw new BadRequestException('Failed to update user');
    }
  }

  // addd section for mail sendind token for password reset later
  async deleteUser(id: string): Promise<
    ApiResponse<{
      message: string;
    }>
  > {
    if (!id) {
      throw new BadRequestException('use id is required');
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      await this.prisma.user.update({
        where: { id },
        data: { isActive: false },
      });

      return {
        success: true,
        message: 'User deactivated successfully',
        data: { message: 'User deactivated successfully' },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to deactivate user');
    }
  }
}
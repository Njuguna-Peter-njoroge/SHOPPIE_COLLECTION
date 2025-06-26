/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './Dtos/createUserDto';
import { UserResponseDto } from './Dtos/userResponse.Dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import * as bcrypt from 'bcryptjs';
import { updateUserDto } from './Dtos/updateUserDto';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  private sanitizeUser(user: any): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { password, ...rest } = user;
    return rest as UserResponseDto;
  }

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
      } catch (error) {
        this.logger.error('Failed to send welcome email:', error);
      }

      return {
        success: true,
        message: 'User created successfully',
        data: this.sanitizeUser(user),
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

  async findAll(paginationOptions: {
    page: number | undefined;
    limit: number | undefined;
  }): Promise<ApiResponse<UserResponseDto[]>> {
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

  async findOne(id: string): Promise<ApiResponse<UserResponseDto>> {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      message: 'User retrieved successfully',
      data: this.sanitizeUser(user),
    };
  }

  async findByEmail(email: string): Promise<ApiResponse<UserResponseDto>> {
    if (!email) throw new BadRequestException('Email is required');

    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
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

  async update(
    id: string,
    data: updateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    if (!id) throw new BadRequestException('User ID is required');

    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser || !existingUser.isActive) {
      throw new NotFoundException('User not found');
    }

    const updateData: Prisma.UserUpdateInput = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;

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
      if (error instanceof PrismaClientKnownRequestError) {
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

  async deleteUser(id: string): Promise<ApiResponse<{ message: string }>> {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

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
}

// import { PrismaClient } from 'generated/prisma/client';
import { CreateUserDto } from './Dtos/createUserDto';
import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UserResponseDto } from './Dtos/userResponse.Dto';
// import { Prisma } from 'generated/prisma';

import { PrismaService } from 'src/prisma/prisma.service';
// import { getPrismaClient } from 'generated/prisma/runtime/library';
import { ApiResponse } from 'src/Shared/Api-interface/ap-response.interface';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
    if (!data.password) {
      throw new BadRequestException('password is required');
    }
    if (data.password.length < 8) {
      throw new BadRequestException(
        'password must be at least of 8 characters',
      );
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
      const UserResponse: UserResponseDto = {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new BadRequestException('email already exists');
        }
      }
      {
        throw new BadRequestException('failed to create User');
      }
    }
  }
}

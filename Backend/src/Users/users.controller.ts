import { updateUserDto } from './Dtos/updateUserDto';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { CreateUserDto } from './Dtos/createUserDto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  // Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserResponseDto } from './Dtos/userResponse.Dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.UsersService.create(data);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ApiResponse<UserResponseDto[]>> {
    const paginationOptions = {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };
    return this.UsersService.findAll(paginationOptions);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<UserResponseDto>> {
    return this.UsersService.findOne(id);
  }

  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<ApiResponse<UserResponseDto>> {
    return this.UsersService.findByEmail(email);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    return this.UsersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.UsersService.deleteUser(id);
  }
}

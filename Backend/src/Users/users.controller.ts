import { CreateUserDto } from './Dtos/createUserDto';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.UsersService.create(data);
  }
}

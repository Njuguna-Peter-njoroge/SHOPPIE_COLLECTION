import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './Dtos/register.dto';
import { LoginDto } from './Dtos/login.dto';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { AuthService } from './auth.service';
import { UserResponseDto } from '../Users/Dtos/userResponse.Dto';
import { AuthResponse } from './interfaces/authinterface';
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<AuthResponse>> {
    return this.AuthService.login(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    return this.AuthService.register(registerDto);
  }
}
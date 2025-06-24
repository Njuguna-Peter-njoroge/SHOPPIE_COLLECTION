import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './Dtos/register.dto';
import { AuthResponse } from './interfaces/authinterface';
import { ApiResponse } from '../Shared/Api-interface/api-response.interface';
import { UserResponseDto } from '../Users/Dtos/userResponse.Dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<ApiResponse<AuthResponse>>;
    register(registerDto: RegisterDto): Promise<ApiResponse<UserResponseDto>>;
}

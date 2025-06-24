import { RegisterDto } from './Dtos/register.dto';
import { LoginDto } from './Dtos/login.dto';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { AuthService } from './auth.service';
import { UserResponseDto } from '../Users/Dtos/userResponse.Dto';
import { AuthResponse } from './interfaces/authinterface';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    login(loginDto: LoginDto): Promise<ApiResponse<AuthResponse>>;
    register(registerDto: RegisterDto): Promise<ApiResponse<UserResponseDto>>;
}

import { CreateUserDto } from './Dtos/createUserDto';
import { UserResponseDto } from './Dtos/userResponse.Dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { updateUserDto } from './Dtos/updateUserDto';
import { MailerService } from '@nestjs-modules/mailer';
interface PaginationOptions {
    page?: number;
    limit?: number;
}
export declare class UsersService {
    private prisma;
    private mailerService;
    private readonly logger;
    constructor(prisma: PrismaService, mailerService: MailerService);
    create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>>;
    remove(id: string): ApiResponse<{
        message: string;
    }>;
    private sanitizeUser;
    findAll(options?: PaginationOptions): Promise<ApiResponse<UserResponseDto[]>>;
    findOne(id: string): Promise<ApiResponse<UserResponseDto>>;
    getById(id: string): Promise<ApiResponse<UserResponseDto>>;
    findByEmail(email: string): Promise<ApiResponse<UserResponseDto>>;
    update(id: string, data: updateUserDto): Promise<ApiResponse<UserResponseDto>>;
    deleteUser(id: string): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};

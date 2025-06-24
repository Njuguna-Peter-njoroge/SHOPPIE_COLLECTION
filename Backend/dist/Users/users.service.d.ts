import { CreateUserDto } from './Dtos/createUserDto';
import { UserResponseDto } from './Dtos/userResponse.Dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { updateUserDto } from './Dtos/updateUserDto';
interface PaginationOptions {
    page?: number;
    limit?: number;
}
export declare class UsersService {
    private Prisma;
    remove(): ApiResponse<{
        message: string;
    }> | PromiseLike<ApiResponse<{
        message: string;
    }>>;
    constructor(Prisma: PrismaService);
    private sanitizeUser;
    create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>>;
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

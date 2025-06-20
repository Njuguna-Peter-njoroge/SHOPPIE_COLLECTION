import { updateUserDto } from './Dtos/updateUserDto';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { CreateUserDto } from './Dtos/createUserDto';
import { UsersService } from './users.service';
import { UserResponseDto } from './Dtos/userResponse.Dto';
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>>;
    findAll(page?: string, limit?: string): Promise<ApiResponse<UserResponseDto[]>>;
    findOne(id: string): Promise<ApiResponse<UserResponseDto>>;
    findByEmail(email: string): Promise<ApiResponse<UserResponseDto>>;
    update(id: string, updateUserDto: updateUserDto): Promise<ApiResponse<UserResponseDto>>;
    deleteUser(id: string): Promise<ApiResponse<{
        message: string;
    }>>;
}

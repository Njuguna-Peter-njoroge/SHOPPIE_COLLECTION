import { CreateUserDto } from './Dtos/createUserDto';
import { UserResponseDto } from './Dtos/userResponse.Dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/ap-response.interface';
export declare class UsersService {
    private Prisma;
    constructor(Prisma: PrismaService);
    create(data: CreateUserDto): Promise<ApiResponse<UserResponseDto>>;
}

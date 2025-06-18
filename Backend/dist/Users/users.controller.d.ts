import { CreateUserDto } from './Dtos/createUserDto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    create(data: CreateUserDto): Promise<import("../Shared/Api-interface/ap-response.interface").ApiResponse<import("./Dtos/userResponse.Dto").UserResponseDto>>;
}

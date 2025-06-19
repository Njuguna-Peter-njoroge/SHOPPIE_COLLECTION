import { createProductDto } from './Dtos/createproduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
export declare class ProductsService {
    private Prisma;
    constructor(Prisma: PrismaService);
    create(data: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
}

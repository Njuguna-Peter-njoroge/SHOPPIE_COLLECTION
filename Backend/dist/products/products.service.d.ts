import { createProductDto } from './Dtos/createproduct.dto';
import { Product } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
export declare class ProductsService {
    private Prisma;
    constructor(Prisma: PrismaService);
    create(data: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
    findAll(): Promise<Product[]>;
    findOne(id: string): ApiResponse<ProductResponseDto>;
}

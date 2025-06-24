import { createProductDto } from './Dtos/createproduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
export declare class ProductsService {
    private Prisma;
    constructor(Prisma: PrismaService);
    create(data: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
    findAll(): Promise<ApiResponse<ProductResponseDto>[]>;
    findOne(id: string): Promise<ApiResponse<ProductResponseDto>>;
    findByName(name: string): Promise<ApiResponse<ProductResponseDto>>;
    updateProduct(id: string, data: updateProductDto): Promise<ApiResponse<ProductResponseDto>>;
    deleteProduct(id: string): Promise<ApiResponse<{
        message: string;
    }>>;
}

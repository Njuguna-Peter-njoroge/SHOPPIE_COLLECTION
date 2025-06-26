import { createProductDto } from './Dtos/createproduct.dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
import { ProductsService } from './products.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    uploadImage(file: Express.Multer.File): {
        imageUrl: string;
    };
    create(data: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
    findAll(): Promise<ApiResponse<ProductResponseDto>[]>;
    findOne(id: string): Promise<ApiResponse<ProductResponseDto>>;
    findByName(name: string): Promise<ApiResponse<ProductResponseDto>>;
    update(id: string, updateProductDto: updateProductDto): Promise<ApiResponse<ProductResponseDto>>;
    remove(id: string): Promise<ApiResponse<{
        message: string;
    }>>;
}

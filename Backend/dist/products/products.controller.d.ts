import { createProductDto } from './Dtos/createproduct.dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
import { ProductsService } from './products.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    uploadImage(file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        imageUrl: string;
    }>;
    uploadAndCreateProduct(file: Express.Multer.File, productData: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
    create(data: createProductDto): Promise<ApiResponse<ProductResponseDto>>;
    findAll(): Promise<ApiResponse<ProductResponseDto>[]>;
    findOne(id: string): Promise<ApiResponse<ProductResponseDto>>;
    findByName(name: string): Promise<ApiResponse<ProductResponseDto>>;
    update(id: string, updateProductDto: updateProductDto): Promise<ApiResponse<ProductResponseDto>>;
    remove(id: string): Promise<ApiResponse<{
        message: string;
    }>>;
}

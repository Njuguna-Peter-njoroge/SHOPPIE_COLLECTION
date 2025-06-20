import { createProductDto } from './Dtos/createproduct.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    create(data: createProductDto): Promise<import("../Shared/Api-interface/api-response.interface").ApiResponse<import("./Dtos/productResponse.Dto").ProductResponseDto>>;
}

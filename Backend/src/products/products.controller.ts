import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createProductDto } from './Dtos/createproduct.dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
import { ProductsService } from './products.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
import { UploadApiResponse } from 'cloudinary';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndCreateProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() productData: createProductDto,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      // Use Partial<UploadApiResponse> to prevent TS2740 error
      const result: Partial<UploadApiResponse> =
        await this.ProductsService.uploadToCloudinary(file);

      if (!result.secure_url) {
        throw new Error('Image upload did not return a secure_url');
      }

      const dataWithImageUrl: createProductDto = {
        ...productData,
        imageUrl: result.secure_url,
      };

      return await this.ProductsService.create(dataWithImageUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      throw new BadRequestException('Failed to create product: ' + message);
    }
  }

  @Post()
  async create(@Body() data: createProductDto) {
    return this.ProductsService.create(data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<ProductResponseDto>[]> {
    try {
      return await this.ProductsService.findAll();
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Error retrieving products',
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      return await this.ProductsService.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Error retrieving product',
      );
    }
  }

  @Get('by-name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      return await this.ProductsService.findByName(name);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Error retrieving product by name',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: updateProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    return this.ProductsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.ProductsService.deleteProduct(id);
  }
}

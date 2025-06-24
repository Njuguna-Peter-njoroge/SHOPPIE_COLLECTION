import { createProductDto } from './Dtos/createproduct.dto';
import { ProductsService } from './products.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Param, Patch,
  // Post, Put,
} from '@nestjs/common';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
// import {updateProductDto} from "./Dtos/updateproduct.dto";
// import { updateUserDto } from '../Users/Dtos/updateUserDto';
// /import { Product } from 'prisma-client-4a8af5df4dd264be30777db27550107de028b840b0e910b92d42efcbf82efb01';
// import { Product } from 'prisma-client-4a8af5df4dd264be30777db27550107de028b840b0e910b92d42efcbf82efb01';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  async create(@Body() data: createProductDto) {
    return this.ProductsService.create(data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<ProductResponseDto>[]> {
    try {
      return await this.ProductsService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('error retrieving products');
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      return await this.ProductsService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('error retrieving products');
    }
  }

  @Get('by-name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      return await this.ProductsService.findByName(name);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('error retrieving products');
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

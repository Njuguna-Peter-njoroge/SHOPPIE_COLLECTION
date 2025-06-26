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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { createProductDto } from './Dtos/createproduct.dto';
import { updateProductDto } from './Dtos/updateproduct.dto';
import { ProductsService } from './products.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';



@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    return { imageUrl };
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'error retrieving products',
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'error retrieving product',
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'error retrieving product',
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

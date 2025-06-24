// import { Product, ProductStatus } from './../../generated/prisma/index.d';

import { createProductDto } from './Dtos/createproduct.dto';
import { UserRole } from 'generated/prisma';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Get,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
import {
  Decimal,
  PrismaClientKnownRequestError,
} from 'generated/prisma/runtime/library';
import { updateProductDto } from './Dtos/updateproduct.dto';

@Injectable()
export class ProductsService {
  constructor(private Prisma: PrismaService) {}

  async create(
    data: createProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    if (!UserRole.ADMIN) {
      throw new ForbiddenException('only admins can create a product');
    }

    try {
      const existingProduct = await this.Prisma.product.findFirst({
        where: { name: data.name },
      });
      if (existingProduct) {
        throw new ConflictException('A product with this name already exists');
      }
      const Product = await this.Prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: new Decimal(data.price),
          stock: data.stock,
          imageUrl: data.imageUrl,
        },
      });
      const productListResponse: ProductResponseDto = {
        id: Product.id,
        name: Product.name,
        description: Product.description,
        price: Product.price.toString(),
        stock: Product.stock,
        imageUrl: Product.imageUrl,
        createdAt: Product.createdAt,
        updatedAt: Product.updatedAt,
        status: data.status ?? 'AVAILABLE',
      };

      return {
        success: true,
        message: 'product created successfully',
        data: productListResponse,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new BadRequestException('email already exists');
        }
      }
      {
        throw new BadRequestException('failed to create User');
      }
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<ProductResponseDto>[]> {
    try {
      const products = await this.Prisma.product.findMany();

      return products.map((product) => ({
        success: true,
        message: 'Product fetched successfully',
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock,
          imageUrl: product.imageUrl,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          status: product.status,
        },
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to fetch products');
    }
  }

  // async findOne(id: string): Promise<ApiResponse<ProductResponseDto>> {
  //   try{
  //     const product = await this.Prisma.product.findUnique({
  //       where: { id: id },
  //     });
  //     if (!product) {
  //       throw new BadRequestException('Product not found');
  //     }
  //     return this.Prisma.product
  //   }
  //
  // }
  async findOne(id: string): Promise<ApiResponse<ProductResponseDto>> {
    if (!id) {
      throw new ForbiddenException('product id required');
    }
    const product = await this.Prisma.product.findUnique({
      where: { id },
    });
    if (!product || product.status !== 'AVAILABLE') {
      throw new BadRequestException('product not found or not available');
    }
    const response: ProductResponseDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      status: product.status,
    };
    return {
      success: true,
      message: 'product retrieved successfully',
      data: response,
    };
  }

  async findByName(name: string): Promise<ApiResponse<ProductResponseDto>> {
    if (!name) {
      throw new ForbiddenException('product id required');
    }
    const product = await this.Prisma.product.findFirst({
      where: { name },
    });
    if (!product || product.status !== 'AVAILABLE') {
      throw new BadRequestException('product not found or not available');
    }
    const response: ProductResponseDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      status: product.status,
    };
    return {
      success: true,
      message: 'product retrieved successfully',
      data: response,
    };
  }

  async updateProduct(
    id: string,
    data: updateProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      const updated = await this.Prisma.product.update({
        where: { id },
        data: {
          ...data,
          price: data.price ? new Decimal(data.price) : undefined,
        },
      });

      const response: ProductResponseDto = {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        price: updated.price.toString(),
        imageUrl: updated.imageUrl,
        stock: updated.stock,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        status: updated.status,
      };

      return {
        success: true,
        message: 'Product updated successfully',
        data: response,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Failed to update product');
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    if (!id) {
      throw new ForbiddenException('Product ID is required');
    }

    const product = await this.Prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    try {
      await this.Prisma.product.delete({
        where: { id },
      });

      return {
        success: true,
        message: 'Product deleted successfully',
        data: { message: 'Product deleted successfully' },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Failed to delete product');
    }
  }
}

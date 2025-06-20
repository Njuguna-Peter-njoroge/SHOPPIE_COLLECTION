// import { Product, ProductStatus } from './../../generated/prisma/index.d';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createProductDto } from './Dtos/createproduct.dto';
import { Product, UserRole } from 'generated/prisma';
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/Shared/Api-interface/api-response.interface';
import { ProductResponseDto } from './Dtos/productResponse.Dto';
import { Decimal, PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

// import { ProductListResponse } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private Prisma: PrismaService) {}
//
// private sanitizeUser(product: Product): ProductResponseDto {
//     const { name, ...rest } = product;
//     return rest as ProductResponseDto;
//   }


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
  async findAll(): Promise<Product[]> {
    try {
      return await this.Prisma.product.findMany();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to fetch products');
    }
  }

  //find one product
  findOne(id: string): ApiResponse<ProductResponseDto> {
    if (!id) {
      throw new BadRequestException('product id is required');
    }
    return {
      success: true,
      message: 'User retrieved successfully',
      data this.Prisma;
    };

  }
}

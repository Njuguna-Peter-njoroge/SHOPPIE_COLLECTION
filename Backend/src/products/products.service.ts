import { createProductDto } from './Dtos/createproduct.dto';
import { UserRole } from 'generated/prisma';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class ProductsService {
  constructor(private Prisma: PrismaService) {}

  async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<{ secure_url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'shoppie_products' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            const cloudinaryResult = result as {
              secure_url: string;
              public_id: string;
            };
            console.log('✅ Cloudinary Upload Success:', cloudinaryResult);
            resolve(cloudinaryResult);
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async create(
    data: createProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    // Simulated admin check (replace with real role check in actual app context)
    if (UserRole.ADMIN !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can create a product');
    }

    try {
      const existingProduct = await this.Prisma.product.findFirst({
        where: { name: data.name },
      });

      if (existingProduct) {
        throw new ConflictException('A product with this name already exists');
      }

      const product = await this.Prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: new Decimal(data.price),
          stock: data.stock,
          imageUrl: data.imageUrl,
          category: data.category,
        },
      });

      const response: ProductResponseDto = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: product.category,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        status: data.status ?? 'AVAILABLE',
      };

      return {
        success: true,
        message: 'Product created successfully',
        data: response,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Product already exists');
        }
      }

      throw new BadRequestException('Failed to create product');
    }
  }

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
          category: product.category,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          status: product.status,
        },
      }));
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to fetch products',
      );
    }
  }

  async findOne(id: string): Promise<ApiResponse<ProductResponseDto>> {
    if (!id) {
      throw new ForbiddenException('Product ID required');
    }

    const product = await this.Prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.status !== 'AVAILABLE') {
      throw new BadRequestException('Product not found or not available');
    }

    const response: ProductResponseDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      status: product.status,
    };

    return {
      success: true,
      message: 'Product retrieved successfully',
      data: response,
    };
  }

  async findByName(name: string): Promise<ApiResponse<ProductResponseDto>> {
    if (!name) {
      throw new ForbiddenException('Product name required');
    }

    const product = await this.Prisma.product.findFirst({
      where: { name },
    });

    if (!product || product.status !== 'AVAILABLE') {
      throw new BadRequestException('Product not found or not available');
    }

    const response: ProductResponseDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      status: product.status,
    };

    return {
      success: true,
      message: 'Product retrieved successfully',
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
        stock: updated.stock,
        imageUrl: updated.imageUrl,
        category: updated.category,
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
      await this.Prisma.product.delete({ where: { id } });

      return {
        success: true,
        message: 'Product deleted successfully',
        data: { message: 'Product deleted successfully' },
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete product');
    }
  }
}

import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ProductStatus } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: Decimal;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsEnum(ProductStatus, {
    message: `Status must be one of: ${Object.values(ProductStatus).join(', ')}`,
  })
  status: ProductStatus;
}

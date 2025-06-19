/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// import { Transform, Type } from 'class-transformer';
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
  // @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  // @Transform(({ value }) => value.trim())
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  // @Transform(({ value }) => value.trim())
  price: Decimal;

  @IsUrl()
  // @Transform(({ value }) => value.trim())
  imageUrl: string;

  @IsNumber()
  @Type(() => Number)
  // @Transform(({ value }) => value.trim())
  stock: number;

  @IsOptional()
  @IsEnum(ProductStatus, {
    message: `Status must be one of: ${Object.values(ProductStatus).join(', ')}`,
  })
  status: ProductStatus;
}

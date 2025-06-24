import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';

export class updateProductDto {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @MinLength(8, { message: 'name must be at least 8 characters long' })
  @MaxLength(15, { message: 'name must not be more than 15 characters long' })
  name: string;

  @IsOptional()
  @IsString({ message: 'email be a string' })
  @MinLength(8, { message: 'email must be at least 8 characters long' })
  @MaxLength(20, { message: 'email must not exceed 20 characters' })
  @IsEmail({}, { message: 'please provide a valid email' })
  email: string;

  @IsOptional()
  @IsString({ message: 'must be a string' })
  description: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Price must be a valid decimal (e.g. 19.99)',
  })
  price?: Decimal;
@IsOptional()
  @IsNumber({}, { message: 'must be a number' })
  @IsPositive({ message: 'must be a greater than 0' })
  stock: number;
}

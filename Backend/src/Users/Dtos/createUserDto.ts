/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { join } from 'node:path';
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole, UserStatus } from 'generated/prisma';
import 'reflect-metadata';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be atleast 2 characters' })
  @MaxLength(50, { message: 'Name must be atmost 50 characters' })
  name!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string = '';

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string = '';

  @IsEnum(UserRole, {
    message: `Role must be one of: ${Object.values(UserRole).join(', ')}`,
  })
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status must be one of: ${Object.values(UserStatus).join(', ')}`,
  })
  status: UserStatus;
}

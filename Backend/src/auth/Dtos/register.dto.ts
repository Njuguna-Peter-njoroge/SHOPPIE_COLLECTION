import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsNotEmpty({ message: 'Name is required' })
  name!: string;
}

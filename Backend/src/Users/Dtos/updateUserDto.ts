import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { Transform } from 'stream';

export class updateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be atleast 2 characters' })
  @MaxLength(50, { message: 'Name must be atmost 50 characters' })
  name!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })

  //   @Transform(({ value }) => value?.toLowerCase().trim())
  email: string = '';
}

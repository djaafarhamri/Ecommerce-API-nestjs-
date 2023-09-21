import { Length, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['vendor', 'customer', 'admin'], { message: 'Invalid role' })
  role: 'vendor' | 'customer' | 'admin';
}

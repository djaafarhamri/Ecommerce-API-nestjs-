import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsIn(['ADMIN', 'USER'])
  @IsString()
  role: 'ADMIN' | 'USER' = 'USER';
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}

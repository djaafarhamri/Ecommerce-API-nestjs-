import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  sku?: string;

  //JSON.parse() the variants with class transformer
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  })
  @IsArray()
  @IsNotEmpty()
  variants: VariantDto[];

  @IsString()
  category: string;
}

class VariantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  values: string[];

  @IsOptional()
  image?: string;

  @IsNumber()
  quantity: number;
}

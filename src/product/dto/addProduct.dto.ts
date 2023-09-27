export class AddProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  sku?: string;
  variants: VariantDto[];
  category: {
    name: string;
    description?: string;
  };
}
class VariantDto {
  name: string;
  price: number;
  values: string[];
  image?: string;
  quantity: number;
}

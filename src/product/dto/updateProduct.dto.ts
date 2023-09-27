export class UpdateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  sku?: string;
  category: {
    name: string;
    description?: string;
  };
}

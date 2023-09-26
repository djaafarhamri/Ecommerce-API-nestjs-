export class AddProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  sku?: string;
  variants: VariantDto[];
  category: string;
  promotions?: PromotionDto;
}

class PromotionDto {
  name: string;
  description?: string;
  newPrice: number;
  active: boolean;
}

class VariantDto {
  name: string;
  price: number;
  values: string[];
  image?: string;
  quantity: number;
}

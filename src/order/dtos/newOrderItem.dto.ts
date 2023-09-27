export class NewOrderItemDto {
  variant: {
    id: number;
    name: string;
    values: string[];
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      description: string;
    };
  };
  quantity: number;
}

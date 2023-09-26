import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  addProduct(@Body() product: any) {
    return this.productService.addProduct(product);
  }

  @Get('all')
  findAll() {
    return this.productService.findAll();
  }

  @Get('all-by-category')
  findAllByCategory() {
    return this.productService.findAllByCategory();
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard, AdminGuard } from '../auth/guard';
import { AddProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  addProduct(@Body() product: AddProductDto) {
    return this.productService.addProduct(product);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() product: AddProductDto) {
    return this.productService.updateProduct(id, product);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
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

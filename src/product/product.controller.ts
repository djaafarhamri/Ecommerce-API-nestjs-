import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard, AdminGuard } from '../auth/guard';
import { AddProductDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname;
          const extension: string = filename.split('.')[1];
          cb(null, `${Date.now()}.${extension}`);
        },
      }),
    }),
  )
  addProduct(
    @Body() product: AddProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log('image: ', image);
    console.log('product: ', product);
    return this.productService.addProduct(product, image);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @Param('id') id: number,
    @Body() product: AddProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.updateProduct(id, product, image);
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

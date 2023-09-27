import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { AddCategoryDto } from './dtos';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  addCategory(@Body() category: AddCategoryDto) {
    return this.categoryService.addCategory(category);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() category: AddCategoryDto) {
    return this.categoryService.updateCategory(id, category);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.categoryService.findOneByName(name);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.categoryService.findOneById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async addCategory(category: AddCategoryDto) {
    console.log(category);
    return await this.prisma.category.create({
      data: category,
    });
  }

  async updateCategory(id: number, category: AddCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: category,
    });
  }

  async deleteCategory(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOneByName(name: string) {
    return await this.prisma.category.findUnique({
      where: { name },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }
}

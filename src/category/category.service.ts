import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  addCategory(category: any) {
    return this.prisma.category.create({
      data: category,
    });
  }

  updateCategory(id: number, category: any) {
    return this.prisma.category.update({
      where: { id },
      data: category,
    });
  }

  deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOneByName(name: string) {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }

  findOneById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }
}

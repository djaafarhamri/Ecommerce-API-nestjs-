import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  addCategory(category: Category) {
    return this.prisma.category.create({
      data: category,
    });
  }

  addProduct(product: Product) {
    return this.prisma.product.create({
      data: product,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findAllByCategory() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }
}

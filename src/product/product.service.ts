import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  addProduct(product: any) {
    return this.prisma.product.create({
      data: {
        ...product,
        category: {
          connect: {
            where: { name: product.categoryName },
          },
        },
        variants: {
          create: product.variants,
        },
      },
    });
  }

  updateProduct(id: number, product: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...product,
        category: {
          connect: {
            where: { name: product.categoryName },
          },
        },
      },
    });
  }

  deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
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

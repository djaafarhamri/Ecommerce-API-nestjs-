import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(product: AddProductDto) {
    return await this.prisma.product.create({
      data: {
        ...product,
        category: {
          connect: { name: product.category.name },
        },
        variants: {
          create: product.variants,
        },
      },
    });
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        ...product,
        category: {
          connect: { name: product.category.name },
        },
      },
    });
  }

  async deleteProduct(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        variants: true,
        category: true,
        promotions: true,
      },
    });
  }

  async findAllByCategory() {
    return await this.prisma.product.findMany({
      include: {
        variants: true,
        category: true,
        promotions: true,
      },
    });
  }
}

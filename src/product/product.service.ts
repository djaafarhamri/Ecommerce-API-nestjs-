import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(product: AddProductDto, image: Express.Multer.File) {
    return await this.prisma.product.create({
      data: {
        ...product,
        image: image.filename,
        category: {
          connect: { name: product.category },
        },
        variants: {
          create: product.variants,
        },
      },
    });
  }

  async updateProduct(
    id: number,
    product: UpdateProductDto,
    image: Express.Multer.File,
  ) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        ...product,
        image: image.filename,
        category: {
          connect: { name: product.category },
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

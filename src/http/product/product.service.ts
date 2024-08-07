import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { HelperUpload } from 'src/shared/helpers';

interface IFilterGetProducts {
  name?: string;
  skip?: number;
  take?: number;
}

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(payload: Product) {
    const helperUpload = new HelperUpload();

    const image = await helperUpload.saveFileS3Storage(payload.image);

    const product = await this.prismaService.product.create({
      data: {
        ...payload,
        image,
        price: Number(payload.price),
        isLaunch: Boolean(payload.isLaunch),
        currentStock: Number(payload.currentStock),
      },
    });

    return product;
  }

  async getProducts({ name, skip = 0, take = 10 }: IFilterGetProducts) {
    let whereClausule: any = {};

    if (name && name !== '') {
      whereClausule = {
        ...whereClausule,
        name: {
          contains: name,
          mode: 'insensitive',
        },
      };
    }

    const [products, total] = await this.prismaService.$transaction([
      this.prismaService.product.findMany({
        where: whereClausule,
        skip,
        take,
      }),
      this.prismaService.product.count({
        where: whereClausule,
      }),
    ]);

    return {
      products: products.map((item) => ({
        ...item,
        image: `https://bucket-natura-s3.s3.amazonaws.com/${item.image}`,
      })),
      total,
      nextCursor:
        skip + products.length < total ? skip + products.length : undefined,
    };
  }

  async getProductById(id: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });

    return {
      ...product,
      image: `https://bucket-natura-s3.s3.amazonaws.com/${product.image}`,
    };
  }
}

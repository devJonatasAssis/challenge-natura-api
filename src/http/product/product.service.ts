import { Injectable } from '@nestjs/common';
import { $Enums, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { HelperUpload } from 'src/shared/helpers';

interface IFilterGetProducts {
  category?: $Enums.Category;
}

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(payload: Product) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts({ category }: IFilterGetProducts) {
    try {
      const find = await this.prismaService.product.findMany({
        where: {
          category,
        },
      });

      return find.map((item) => ({
        ...item,
        image: `https://bucket-natura-s3.s3.amazonaws.com/${item.image}`,
      }));
    } catch (error) {
      console.error(error);
    }
  }
}

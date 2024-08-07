import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import AppError from '../../shared/errors/AppError';

interface IFindCartProducts {
  userId: string;
}

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCart(payload: Cart) {
    const findExistProduct = await this.prismaService.cart.findFirst({
      where: {
        productId: payload.productId,
      },
    });

    if (findExistProduct) {
      throw new AppError('Já existe esse produto no seu carrinho.');
    }

    await this.prismaService.cart.create({
      data: payload,
    });
  }

  async findCartProducts({ userId }: IFindCartProducts) {
    const [carts, total] = await this.prismaService.$transaction([
      this.prismaService.cart.findMany({
        where: { userId },
        include: {
          product: {
            select: {
              name: true,
              brand: true,
              image: true,
              price: true,
            },
          },
        },
      }),
      this.prismaService.cart.count({
        where: {
          userId,
        },
      }),
    ]);

    const amountTotalProducts = carts.reduce(
      (acc, value) => acc + value.product.price * value.quantity,
      0,
    );

    return { carts, total, amountTotalProducts };
  }

  async deleteProduct(id: string) {
    return await this.prismaService.cart.delete({
      where: {
        id,
      },
    });
  }
}

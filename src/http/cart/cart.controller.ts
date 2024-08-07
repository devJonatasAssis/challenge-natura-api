import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() payload: Cart) {
    return this.cartService.createCart(payload);
  }

  @Get('/:userId')
  async findCartByUser(@Param() params) {
    const { userId } = params;
    return this.cartService.findCartProducts({ userId });
  }

  @Delete('/:id')
  async removeItem(@Param() params) {
    return this.cartService.deleteProduct(params.id);
  }
}

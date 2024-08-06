import { Module } from '@nestjs/common';
import UserController from './http/user/user.controller';
import UserService from './http/user/user.service';
import { PrismaService } from './database/prisma.service';
import { ProductController } from './http/product/product.controller';
import { ProductService } from './http/product/product.service';
import { AuthController, AuthService } from './http/authenticate';
import { CartController, CartService } from './http/cart';

@Module({
  imports: [],
  controllers: [
    UserController,
    ProductController,
    AuthController,
    CartController,
  ],
  providers: [
    PrismaService,
    UserService,
    ProductService,
    AuthService,
    CartService,
  ],
})
export class AppModule {}

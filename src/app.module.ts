import { Module } from '@nestjs/common';
import UserController from './http/user/user.controller';
import UserService from './http/user/user.service';
import { PrismaService } from './database/prisma.service';
import { ProductController } from './http/product/product.controller';
import { ProductService } from './http/product/product.service';
import { AuthController, AuthService } from './http/authenticate';

@Module({
  imports: [],
  controllers: [UserController, ProductController, AuthController],
  providers: [PrismaService, UserService, ProductService, AuthService],
})
export class AppModule {}

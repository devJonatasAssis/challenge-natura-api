import { Module } from '@nestjs/common';
import UserController from './http/user/user.controller';
import UserService from './http/user/user.service';
import { PrismaService } from './database/prisma.service';
import { ProductController } from './http/product/product.controller';
import { ProductService } from './http/product/product.service';

@Module({
  imports: [],
  controllers: [UserController, ProductController],
  providers: [PrismaService, UserService, ProductService],
})
export class AppModule {}

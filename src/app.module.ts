import { Module } from '@nestjs/common';
import UserController from './http/user/user.controller';
import UserService from './http/user/user.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}

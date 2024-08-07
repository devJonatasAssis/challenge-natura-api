import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import AppError from '../../shared/errors/AppError';

@Injectable()
export default class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(payload: User) {
    const findUserExists = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (findUserExists) {
      throw new AppError('Usuário já existe na plataforma');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 8);

    const user = await this.prismaService.user.create({
      data: { ...payload, password: hashedPassword },
    });

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../database/prisma.service';
import authConfig from '../../config/auth';
import AppError from '../../shared/errors/AppError';

export interface AuthProps {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email, password }: AuthProps) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError('Não encontramos nenhum usuário.');
    }

    if (!user.password) {
      throw new AppError('Você precisa informar uma senha para continuar');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email ou senha incorretos.', 401);
    }

    const token = sign({}, authConfig.jwt.secret || '', {
      subject: user.id,
      expiresIn: authConfig.jwt.expressIn,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

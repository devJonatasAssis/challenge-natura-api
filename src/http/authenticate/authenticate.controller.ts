import { Body, Controller, Post } from '@nestjs/common';
import { AuthProps, AuthService } from './authenticate.service';

@Controller('session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async execute(@Body() body: AuthProps) {
    const { email, password } = body;
    const { user, token } = await this.authService.execute({ email, password });
    return { token, user };
  }
}

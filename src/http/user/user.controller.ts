import { Body, Controller, Post } from '@nestjs/common';
import UserService from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() payload: User) {
    return this.userService.save(payload);
  }
}

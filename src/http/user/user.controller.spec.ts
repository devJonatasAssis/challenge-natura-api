import { Test, TestingModule } from '@nestjs/testing';
import UserController from './user.controller';
import UserService from './user.service';
import { User } from '@prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    save: jest.fn((user: User) => {
      return {
        ...user,
        id: '1',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const payload = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    } as User;
    const result = await userController.save(payload);

    expect(userService.save).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      ...payload,
      id: '1',
    });
  });
});

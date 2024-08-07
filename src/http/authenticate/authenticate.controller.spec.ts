import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './authenticate.controller';
import { AuthService } from './authenticate.service';
import { AuthProps } from './authenticate.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    execute: jest.fn((authProps: AuthProps) => {
      return {
        user: { id: '1', email: authProps.email },
        token: 'some-token',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should call AuthService and return token and user', async () => {
    const result = await authController.execute({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(authService.execute).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual({
      token: 'some-token',
      user: { id: '1', email: 'test@example.com' },
    });
  });
});

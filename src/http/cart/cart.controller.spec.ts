import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  const mockCartService = {
    createCart: jest.fn((payload: Cart) => {
      return {
        id: '1',
        userId: payload.userId,
        productId: payload.productId,
        quantity: payload.quantity,
      };
    }),
    findCartProducts: jest.fn(({ userId }) => {
      return [
        {
          id: '1',
          userId: userId,
          productId: '1',
          quantity: 2,
          product: {
            id: '1',
            name: 'Product 1',
            price: 100,
            image: 'product1.jpg',
          },
        },
      ];
    }),
    deleteProduct: jest.fn((id: string) => {
      return {
        id: id,
        userId: '1',
        productId: '1',
        quantity: 2,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
  });

  it('should create a cart item', async () => {
    const payload = {
      userId: '1',
      productId: '1',
      quantity: 2,
    } as Cart;
    const result = await cartController.create(payload);

    expect(cartService.createCart).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      id: '1',
      userId: '1',
      productId: '1',
      quantity: 2,
    });
  });

  it('should find cart items by user', async () => {
    const userId = '1';
    const result = await cartController.findCartByUser({ userId });

    expect(cartService.findCartProducts).toHaveBeenCalledWith({ userId });
    expect(result).toEqual([
      {
        id: '1',
        userId: '1',
        productId: '1',
        quantity: 2,
        product: {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'product1.jpg',
        },
      },
    ]);
  });

  it('should delete a cart item', async () => {
    const id = '1';
    const result = await cartController.removeItem({ id });

    expect(cartService.deleteProduct).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      id: '1',
      userId: '1',
      productId: '1',
      quantity: 2,
    });
  });
});

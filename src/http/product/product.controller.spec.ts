import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  const mockProductService = {
    createProduct: jest.fn((product: Product) => {
      return {
        ...product,
        id: '1',
        image: product.image,
      };
    }),
    getProducts: jest.fn(() => {
      return [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'product1.jpg',
        },
      ];
    }),
    getProductById: jest.fn((id: string) => {
      return {
        id: id,
        name: 'Product 1',
        price: 100,
        image: 'product1.jpg',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  it('should create a product', async () => {
    const file = {
      filename: 'test.jpg',
    };
    const data = {
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      categoryId: '1',
    } as unknown as Product;
    const result = await productController.create(file, data);

    expect(productService.createProduct).toHaveBeenCalledWith({
      ...data,
      image: 'test.jpg',
    });
    expect(result).toEqual({
      ...data,
      id: '1',
      image: 'test.jpg',
    });
  });

  it('should get all products', async () => {
    const queryParams = { name: 'Product', skip: 0, take: 10 };
    const result = await productController.getAllProducts(queryParams);

    expect(productService.getProducts).toHaveBeenCalledWith({
      name: 'Product',
      skip: 0,
      take: 10,
    });
    expect(result).toEqual([
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'product1.jpg',
      },
    ]);
  });

  it('should get a product by id', async () => {
    const id = '1';
    const result = await productController.getProductById({ id });

    expect(productService.getProductById).toHaveBeenCalledWith('1');
    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
      image: 'product1.jpg',
    });
  });
});

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import upload, { HelperUpload } from '../../config/upload';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: upload.tmpFolder,
        filename: HelperUpload.customFileName,
      }),
    }),
  )
  async create(@UploadedFile() file: any, @Body() data: Product) {
    const response = await this.productService.createProduct({
      ...data,
      image: file.filename,
    });

    return response;
  }

  @Get()
  async getAllProducts(@Query() queryParams) {
    const { name, skip = 0, take = 10 } = queryParams;
    return this.productService.getProducts({
      name,
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Get('/:id')
  async getProductById(@Param() params) {
    const { id } = params;
    return this.productService.getProductById(id);
  }
}

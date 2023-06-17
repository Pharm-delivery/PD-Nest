import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  getCategories() {
    return this.service.getCategories();
  }
}

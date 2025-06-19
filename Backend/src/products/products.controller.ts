import { createProductDto } from './Dtos/createproduct.dto';
import { ProductsService } from './products.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  async create(@Body() data: createProductDto) {
    return this.ProductsService.create(data);
  }
}

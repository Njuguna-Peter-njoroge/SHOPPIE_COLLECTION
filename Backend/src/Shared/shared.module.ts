import { Module } from '@nestjs/common';
import { ApiResponseService } from './api-response.products.interface';

@Module({
  providers: [ApiResponseService],
  exports: [ApiResponseService],
})
export class SharedModule {} 
import { Module } from '@nestjs/common';
import { CartItemService } from './cartitem.service';
import { CartItemController } from './cartitem.controller';
import {ApiResponse} from '../Shared/Api-interface/api-response.interface';
import { ApiResponseService } from '../Shared/api-response.products.interface';

@Module({
  providers: [CartItemService],
  // providers: [ApiResponseService],
  controllers: [CartItemController], // ✅ match the import name
})
export class CartItemModule {} // ✅ optional: consider matching naming for consistency

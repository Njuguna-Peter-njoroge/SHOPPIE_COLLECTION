import { Module } from '@nestjs/common';
import { CartItemService } from './cartitem.service';
import { CartItemController } from './cartitem.controller';
import { SharedModule } from '../Shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}

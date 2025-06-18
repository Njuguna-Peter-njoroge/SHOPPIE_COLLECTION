import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { UsersService } from './Users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './Users/users.controller';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}

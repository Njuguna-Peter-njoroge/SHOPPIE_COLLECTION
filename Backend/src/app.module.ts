import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { UsersService } from './Users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
// import { CartItemModule } from './cartitem/cartitem.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtconfigModule } from './jwtconfig/jwtconfig.module';
import { CloudinaryModule } from './cloudinary/cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ProductsModule,
    // CartItemModule,
    AuthModule,
    JwtconfigModule,
    JwtconfigModule,
    CloudinaryModule,
  ],
  providers: [AppService, UsersService, AuthService, CloudinaryService,],
  controllers: [AuthController, CloudinaryController],
})
export class AppModule {}

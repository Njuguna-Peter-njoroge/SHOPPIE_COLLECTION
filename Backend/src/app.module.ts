import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
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
import { MailerService } from './mailer/mailer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
    PrismaModule,
    ProductsModule,
    // CartItemModule,
    AuthModule,
    JwtconfigModule,
    JwtconfigModule,
    CloudinaryModule,
    MailerModule,
  ],
  providers: [
    AppService,
    UsersService,
    AuthService,
    CloudinaryService,
    MailerService,
  ],
  controllers: [AuthController, CloudinaryController],
})
export class AppModule {}

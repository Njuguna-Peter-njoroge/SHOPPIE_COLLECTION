import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Add global validation pipe with transform enabled
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unwanted properties
      transform: true, // enables class-transformer
      forbidNonWhitelisted: true, // throws error if unknown props are sent
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

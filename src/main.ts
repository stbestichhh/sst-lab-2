import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 9110;
  const HOST = process.env.HOST || 'localhost';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);
  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get<number>('PORT') || Number(process.env.PORT);
  const HOST = config.get<string>('HOST') || process.env.HOST;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(PORT, HOST, () => {
    logger.log(`Server is running on http://${HOST}:${PORT}`);
  });
}
bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import process from "process";

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  const port = process.env.PORT || 3005;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

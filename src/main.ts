/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const server = express();
  server.use('/public/uploads', express.static('public/uploads'));
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  /*app.useGlobalPipes(new ValidationPipe({

    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true
  }))*/
  await app.listen(3000);
}
bootstrap();

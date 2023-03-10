import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './filters/database-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200',
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  //whitelist — removes any property of query, body, and a parameter that is not part of our DTO
  //transform — enables the transformation of our incoming reques
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await app.listen(process.env.PORT);
  //app.enableCors();
  console.log(`My server is running on port ${process.env.PORT}`);
}
bootstrap();

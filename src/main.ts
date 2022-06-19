import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExtractJwt } from 'passport-jwt';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  const config = new DocumentBuilder()
    .setTitle('API ecommerce')
    .setDescription('API ecommerce')
    .setVersion('1.0')
    .addBearerAuth({ 
      in: 'header',
      type:'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',  
    },'JWT-auth')
    .addTag('x')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SocketIOAdapter } from './socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    origin: [config.get('CLIENT_URI1'), config.get('CLIENT_URI2')],
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useWebSocketAdapter(new SocketIOAdapter(app, config));
  await app.listen(config.get('PORT'));
}
bootstrap();

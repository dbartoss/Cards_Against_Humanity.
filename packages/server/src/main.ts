import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
// import * as csurf from 'csurf'; TODO: Add XSRF protection
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: false });

  app.use(helmet());
  // app.use(csurf()); TODO: Add XSRF protection
  app.use(
    rateLimit({
      windowMs: 1000, // 1 second
      max: 50, // limit each IP to 50 requests per windowMs
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();

import { RequestMethod, VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './common/utils';
import { join } from 'path';

async function bootstrap() {
  // Load environment variables from .env file
  config();
  const logger = new Logger();

  const port = process.env.PORT || 4000;
  const app_debug = process.env.APP_DEBUG || false;

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // 
  app.use(cookieParser());
  app.useBodyParser('json', { limit: '20mb' });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // cors
  app.enableCors({
    origin: "*",
  });

  // 
  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidUnknownValues: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  // Enable trust for the proxy
  app.getHttpAdapter().getInstance().set('trust proxy', true);

  // dotenv.config();

  // prefix
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: 'docs', method: RequestMethod.GET },
    ],
  });

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // console.log('process.env.APP_DEBUG', process.env.APP_DEBUG);
  // logger.log(`process.env.APP_DEBUG ${process.env.APP_DEBUG}`);
  // docs
  if (app_debug === 'true') {
    // Swagger
    setupSwagger(app);
  }

  // Log each request
  app.use((req :any, res:any, next:any) => {
    logger.log(`Request ${req.method} ${req.originalUrl}`);
    next();
  });

  (app as any).set('etag', false);

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });


  logger.log(`Server running on http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();

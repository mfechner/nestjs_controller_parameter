import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { join } from 'path';
import { AppModule } from './app.module';
const i18next = require('i18next');
const middleware = require('i18next-express-middleware');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  i18next.use(middleware.LanguageDetector).init({
    detection: {
      order: ['path', 'header', 'session', 'querystring', 'cookie'],
    },
  });

  app.use(
    middleware.handle(i18next, {
      ignoreRoutes: ['/api'],
      removeLngFromUrl: false,
    }),
  );

  app.useStaticAssets(join(__dirname, 'public'));
  app.use(compression());
  await app.listen(3000);
}
bootstrap();

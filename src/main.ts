import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import * as compression from 'compression';
//import * as cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';
//import * as Sentry from '@sentry/node';
//import helmet from 'helmet';
import { SentryFilter } from 'src/commons/filters/sentry.filter';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { AppModule } from 'src/modules/_app/_app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  /* app.use(cookieParser());
  app.use(compression());
  app.use(helmet()); */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  /*  Sentry.init({
    dsn: configLoaderHelper().sentry.dns,
  }); */

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('smartChurch API')
    .setDescription(
      'This API was created to facilitate and concentrate the model of integration and connection of services and devices with the smartChurh Platform.',
    )
    .setVersion('1.0')
    /* .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    ) */
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(
    configLoaderHelper().application.port || parseInt(AppModule.port),
  );
}
bootstrap();

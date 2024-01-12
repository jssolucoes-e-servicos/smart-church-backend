import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { TimingInterceptor } from 'src/commons/interceptors/timing.interceptor';
import { LoggerMiddleware } from 'src/commons/middlewares/LoggerMiddleware';
import { PreserveController } from 'src/modules/_app/controllers/preserve.controller';
import { AppService } from 'src/modules/_app/services/_app.service';
import { envSchema } from 'src/modules/_app/validators/env-schema';
import { AuthModule } from 'src/modules/auth/auth.module';
import { LoggerService } from 'src/modules/logger/services/logger.service';
/* import { ChurchModule } from 'src/modules/church/church.module'; */
import { PersonsModule } from 'src/modules/persons/persons.module';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoaderHelper],
      validationSchema: envSchema,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    AuthModule,
    /* ChurchModule, */
    PersonsModule,
  ],
  controllers: [PreserveController],
  providers: [
    AppService,
    PrismaService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
  ],
  exports: [AppService],
})
export class AppModule {
  static port: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

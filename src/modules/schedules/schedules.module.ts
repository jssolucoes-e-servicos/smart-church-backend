import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { SendMailConsumer } from 'src/commons/jobs/consumers/sendMail-consumer';
import { SendMailProcuderService } from 'src/commons/jobs/producers/sendMail-producer.service';
import { MailerService } from 'src/modules/mailer/services/mailer.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: configLoaderHelper().redis.url,
        port: configLoaderHelper().redis.port || 17152,
        username: configLoaderHelper().redis.username,
        password: configLoaderHelper().redis.password,
        db: configLoaderHelper().redis.database,
      },
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    BullModule.registerQueue({ name: 'sendMail-queue' }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    MailerService,
    SendMailProcuderService,
    SendMailConsumer,
  ],
  exports: [SendMailConsumer, SendMailProcuderService],
})
export class SchedulesModule {}

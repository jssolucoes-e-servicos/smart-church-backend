import { Global, Module } from '@nestjs/common';
import { TwilioModule as TwilioModuleNest } from 'nestjs-twilio';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { TwilioController } from 'src/modules/twilio/controllers/twilio.controller';
import { TwilioService } from 'src/modules/twilio/services/twilio.service';

@Global()
@Module({
  imports: [
    TwilioModuleNest.forRoot({
      accountSid: configLoaderHelper().twilio.accountSid,
      authToken: configLoaderHelper().twilio.authToken,
    }),
  ],
  controllers: [TwilioController],
  providers: [TwilioService, PrismaService, LoggerService],
  exports: [TwilioService],
})
export class TwilioModule {}

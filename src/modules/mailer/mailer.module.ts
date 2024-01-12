import { MailerModule as MailerModuleNest } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { MailerService } from 'src/modules/mailer/services/mailer.service';

@Global()
@Module({
  imports: [
    MailerModuleNest.forRoot({
      transport: {
        host: configLoaderHelper().mail.host,
        port: configLoaderHelper().mail.port,
        auth: {
          user: configLoaderHelper().mail.user,
          pass: configLoaderHelper().mail.password,
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

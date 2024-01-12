import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';

type DataUser = {
  name: string;
  email: string;
};

type MailData = {
  to: string;
  from: string;
  subject: string;
  text?: string | null;
  template?: string | null;
  data?: any | null;
};

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(
    private readonly _logger: LoggerService,
    private _mailService: MailerService
    ) {}
  private collection = 'sendMail';
  private cacher = 'sendMail-queue';


  async sendMail(mailData: MailData) {
    try {
      await this._mailService.sendMail({
        to: mailData.to,
        from: mailData.from,
        subject: mailData.subject,
        text: mailData.text,
      });
    } catch (error) {
      let message;
      (error instanceof Error) ? message = error.message : message = String(error);
      this._logger.setError(this.cacher, message);
    }
  }

  @Process('sendMail-NewStudant')
  async sendMailNewSudantJob(job: Job<DataUser>) {
    const { data } = job;
    await this.sendMail({
      to: data.email,
      from: `${process.env.APP_NAME} <${process.env.EMAIL_MAIL}>`,
      subject: 'register',
      text: 'novo cadastro',
      data: data,
    });
  }

  @OnQueueCompleted()
  onComleted(job: Job) {
    this._logger.setLog(this.cacher , `On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onProgress(job: Job) {
    this._logger.setLog(this.cacher , `On Progress ${job.name}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
   this._logger.setLog(this.cacher , `On Active ${job.name}`);
  }
}

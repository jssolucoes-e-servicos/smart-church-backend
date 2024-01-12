import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendMailProcuderService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMailToNewStudant(data: any) {
    await this.queue.add('sendMail-NewStudant', data, { attempts: 5 });
  }
}

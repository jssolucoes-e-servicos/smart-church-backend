import { MailerService as MailerServiceNest } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';

type MailData = {
  to: string;
  from: string;
  subject: string;
  text?: string | null;
  template?: string | null;
  data?: any | null;
};

export class MailerService {
  constructor(private mailService: MailerServiceNest) {}
  private readonly logger = new Logger(MailerService.name);

  async sendMail(mailData: MailData) {
    try {
      this.logger.log(`Preparing mail to: ${mailData.to}`);
      await this.mailService.sendMail({
        to: mailData.to,
        from: mailData.from,
        subject: mailData.subject,
        text: mailData.text,
      });
      this.logger.log(`Mail to: ${mailData.to} send success`);
    } catch (error) {
      this.logger.log(`Mail to: ${mailData.to} fail`);
      this.logger.error(error);
    }
  }
}

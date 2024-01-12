import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getHello(): Promise<any> {
    return { status: 'ok' };
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  preventCloseServerInternal() {
    this.logger.log('prevent close server (internal) executed');
  }

  preventCloseServerExternal() {
    this.logger.log('prevent close server (external api) requested');
    return { status: 'smartChurch-Backend-prevented' };
  }
}

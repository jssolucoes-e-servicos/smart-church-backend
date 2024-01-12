import { Injectable } from '@nestjs/common';
import { TwilioService as TwilioServiceNest } from 'nestjs-twilio';
import { ITwilloSendMessage } from 'src/commons/interfaces';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class TwilioService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
    private readonly _twilio: TwilioServiceNest,
  ) {
    this._paramsSMS.from = '+16813396435';
  }
  private _paramsSMS: { from: string };
  private readonly _name: string = 'TwilioService';
  private readonly _collection = 'Twilio';

  async sendMessageSMS(data: ITwilloSendMessage): Promise<any> {
    this._logger.setLog(
      this._name,
      `SEND SMS: TO: (${data.to}) - MSG: ${data.body}`,
    );
    return await this._twilio.client.messages.create({
      body: data.body,
      from: this._paramsSMS.from,
      to: data.to,
    });
  }
}

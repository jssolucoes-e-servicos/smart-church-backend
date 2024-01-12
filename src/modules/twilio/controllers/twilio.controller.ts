import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { TwilioService } from 'src/modules/twilio/services/twilio.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Get('sms/:destino')
  async sendSMS(@Param('destino') destino: string): Promise<any> {
    await this.twilioService.sendMessageSMS({
      body: 'smartChurch by JS Soluões e Servicos - Mensagem de teste da API SMS',
      to: destino,
    });
    return { result: 'ok' };
  }
}

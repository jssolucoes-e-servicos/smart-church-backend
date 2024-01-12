import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import routes from 'src/commons/routes';
import { AppService } from 'src/modules/_app/services/_app.service';

@ApiTags('App')
@Controller(routes.preserve)
export class PreserveController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async preserve() {
    return this.appService.preventCloseServerExternal();
  }
}

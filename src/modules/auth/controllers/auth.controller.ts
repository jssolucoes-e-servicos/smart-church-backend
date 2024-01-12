import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { ChurchAuthGuard } from 'src/modules/auth/guard/church-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { RequestWithUserType } from 'src/shared/@types';
import routes from 'src/shared/routes';

@ApiTags('Auth')
@Controller(routes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiSecurity('jwt')
  @UseGuards(ChurchAuthGuard)
  async loginWithOrigin(@Request() req: RequestWithUserType, @Body() data: AuthDTO) {
    const { app = null } = req.body;
    //Reject access in recovery
    if (app === null) {
      throw new ForbiddenException(
        `${req.user.name}, você não esta acessando através de uma aplicação autorizada.`,
      );
    }
    //Reject access in recovery
    if (req.user.inRecovery) {
      throw new ForbiddenException(
        `${req.user.name}, você está em processo de recuperação de senha.`,
      );
    }
    //Reject access in recovery
    if (req.user.loginStats !== 'CHECKED') {
      throw new ForbiddenException(
        `${req.user.name}, seu acesso a plataforma não está liberado, procure o administrador de sua instituição.`,
      );
    }

    const permitAccess = await this.authService.verifyPlatformAccess(
      req.user,
      app,
    );

    /*  let ipClient =
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    if (ipClient === '::1') {
      ipClient = 'localhost-dev-test';
    }
 */
    /* const dataSession: AuthSessionDTO = {
      userId: req.user.id,
      userAgent: req.headers['user-agent'],
      ipClient: ipClient,
      app: app,
    }; */

    if (permitAccess.permit === false) {
      throw new ForbiddenException(permitAccess.message);
    } else {
      return this.authService.login(req.user);
    }
  }

  @Post('unlock')
  @UseGuards(JwtAuthGuard)
  async unlock(@Body() data: {personId: string, password: string}){
      return await this.authService.unlock(data);
  }
}

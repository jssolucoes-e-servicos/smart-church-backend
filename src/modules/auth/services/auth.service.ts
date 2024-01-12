import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {
/* ResultAccessPermit, */ IUserResponse,
} from 'src/commons/interfaces';
import { PersonsService } from 'src/modules/persons/services/persons.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly personsService: PersonsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, userPassword: string, churchId: string) {
    const person = await this.personsService.findByUsernameToLogin(
      username,
      churchId,
    );
    if (person) {
      const isPasswordValid = await compare(userPassword, person.password);
      if (isPasswordValid) {
        return {
          ...person,
          password: undefined,
        };
      }
    }
    return null;
  }

  async login(user: IUserResponse, actTFA = false) {
    const payload = { email: user.email, sub: user.id, churchId: user.churhId };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token: user.TwoFactorAuthenticationActive ? null : access_token,
      user: user,
      churchId: user.churhId,
      TFA: user.TwoFactorAuthenticationActive,
    };
  }

  // async verifyPlatformAccess(user: IUserResponse, app: string) {
  /*  let result: ResultAccessPermit = null;
    switch (app) {
      case 'ead':
        result = {
          permit: user.permitEAD,
          message: user.permitEAD
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Plataforma de EAD, procure o administrador de sua instituição.`,
        };
        break;
      case 'church':
        result = {
          permit: user.permitChurch,
          message: user.permitChurch
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Sistema de Gestão, procure o administrador de sua instituição.`,
        };
        break;
      case 'cms':
        result = {
          permit: user.permitEAD_CMS,
          message: user.permitEAD_CMS
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Sistema de Gestão de Matriculas no EAD, procure o administrador de sua instituição.`,
        };
        break;
      case 'portal':
        result = {
          permit: user.permitPortal,
          message: user.permitPortal
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Portal do Membro, procure o administrador de sua instituição.`,
        };
        break;
      default:
        break;
    } */
  // return result;
  // }

  async unlock(data: { personId: string; password: string }) {
    return this.personsService.verifyPasswordToUnlock(
      data.personId,
      data.password,
    );
  }
}

import { IGenre, ILoginStats, IMaritalStatus, ITwoFactorAuthentication } from 'src/commons/interfaces';
import {
  BooleanValidator,
  EmailValidator,
  MongoIdValidator,
  StringValidator,
} from 'src/commons/validators';

export class PersonsCreateDTO {
  @StringValidator({ fieldName: 'name', label: 'Nome', minLength: 10 })
  name: string;

  @StringValidator({ fieldName: 'genre', label: 'Genero', optional: true })
  genre?: IGenre;

  @StringValidator({
    fieldName: 'maritalStatus',
    label: 'Estado Civil',
    optional: true,
  })
  maritalStatus?: IMaritalStatus;

  @StringValidator({
    fieldName: 'birth',
    label: 'Data de nacimento',
    optional: true,
  })
  birth?: Date;

  @StringValidator({ fieldName: 'photo', label: 'Foto', optional: true })
  photo?: string;

  @EmailValidator({ fieldName: 'email', label: 'Email', optional: true })
  email?: string;

  @StringValidator({ fieldName: 'username', label: 'Login', optional: true })
  username?: string;

  @StringValidator({ fieldName: 'password', label: 'Senha', optional: true })
  password?: string;

  @StringValidator({
    fieldName: 'loginAttempts',
    label: 'Tentativas de login',
    optional: true,
  })
  loginAttempts?: number;

  @StringValidator({
    fieldName: 'loginStats',
    label: 'Status do login',
    optional: true,
  })
  loginStats?: ILoginStats;

  @BooleanValidator({
    fieldName: 'inRecovery',
    label: 'Em recuperção de senha',
    optional: true,
  })
  inRecovery?: boolean;

  @BooleanValidator({ fieldName: 'genre', label: 'Genero', optional: true })
  twoFactorAuthenticationActive?: boolean;

  @BooleanValidator({ fieldName: 'member', label: 'É membro', optional: true })
  member?: boolean;

  @StringValidator({
    fieldName: 'memberId',
    label: 'Membro ID',
    optional: true,
  })
  memberId?: string;

  @StringValidator({
    fieldName: 'signedAt',
    label: 'Arrolado em',
    optional: true,
  })
  singnedAt?: Date;

  @StringValidator({
    fieldName: 'signedBy',
    label: 'Arrolado por',
    optional: true,
  })
  singnedBy?: string;

  @BooleanValidator({
    fieldName: 'dizimist',
    label: 'Dizimista',
    optional: true,
  })
  dizimist?: boolean;

  @BooleanValidator({
    fieldName: 'permitChurch',
    label: 'permitChurch',
    optional: true,
  })
  permitChurch?: boolean;

  @BooleanValidator({
    fieldName: 'permitEAD',
    label: 'permitEAD',
    optional: true,
  })
  permitEAD?: boolean;

  @BooleanValidator({
    fieldName: 'permitPortal',
    label: 'permitPortal',
    optional: true,
  })
  permitPortal?: boolean;

  @BooleanValidator({
    fieldName: 'permitEAD_CMS',
    label: 'permitEAD_CMS',
    optional: true,
  })
  permitEAD_CMS?: boolean;

  @StringValidator({
    fieldName: 'twoFactorAuthentication',
    label: 'Autenticação de 2 fatores',
    optional: true,
  })
  twoFactorAuthentication?: ITwoFactorAuthentication | object;

  @StringValidator({
    fieldName: 'sessions',
    label: 'Sessões ativas',
    optional: true,
  })
  @MongoIdValidator({
    fieldName: 'churchId',
    label: 'ID da Igreja',
  })
  churchId: string;
}

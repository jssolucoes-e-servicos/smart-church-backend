import { ApiProperty } from '@nestjs/swagger';
import { StringValidator } from 'src/shared/validators';

export class AuthDTO {
  @ApiProperty({ default: 'jackson' })  
  @StringValidator({ fieldName: 'login', label:'Nome de usuário' })
  login: string;

  @ApiProperty({ default: '522576' })
  @StringValidator({ fieldName: 'password', label:'Senha', minLength: 6 })
  password: string;

  @ApiProperty({ default: 'ead' })
  @StringValidator({ fieldName: 'app', label:'Plataforma ID', minLength: 3 })
  app: string;
  
  @ApiProperty({ default: '64988313af13278eca997368' })
  @StringValidator({ fieldName: 'churchId', label:'Igreja ID' })
  churchId: string;
}
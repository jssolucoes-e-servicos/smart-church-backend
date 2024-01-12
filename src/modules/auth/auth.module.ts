import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';
import { AuthController } from 'src/modules/auth//controllers/auth.controller';
import { AuthService } from 'src/modules/auth//services/auth.service';
import { ChurchStrategy } from 'src/modules/auth/strategies/church.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PersonsModule } from 'src/modules/persons/persons.module';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  imports: [
    PersonsModule,
    PassportModule,
    JwtModule.register({
      secret: configLoaderHelper().jtw.secret,
      signOptions: { expiresIn: 0 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    ChurchStrategy,
    JwtStrategy,
    LoggerService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

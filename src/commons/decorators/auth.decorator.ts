import { RolesGuard } from 'src/modules/auth/guard/roles.guard';

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesEnum } from 'src/commons/enums';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

export function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    //ApiSecurity('JWT-auth'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/* export function AuthTag(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(
      JwtAuthGuard,
    ),
    ApiSecurity('JWT-auth'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
 */

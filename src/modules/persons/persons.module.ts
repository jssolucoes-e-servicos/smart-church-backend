import { Module } from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PersonsController } from 'src/modules/persons/controllers/persons.controller';
import { PersonsService } from 'src/modules/persons/services/persons.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PrismaService, LoggerService],
  exports: [PersonsService],
})
export class PersonsModule {}

import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthControllerTag } from 'src/commons/decorators/auth-controller-tag.decorator';
import routes from 'src/commons/routes';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { findWithNameType } from 'src/modules/persons/@types/person';
import { PersonsCreateDTO } from 'src/modules/persons/dto/persons.create.dto';
import { PersonsUpdateDTO } from 'src/modules/persons/dto/persons.update.dto';
import { PersonsService } from 'src/modules/persons/services/persons.service';

@AuthControllerTag('Persons', routes.persons)
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post(':churchId')
  async create(
    @Param('churchId') churchId: string,
    @Body() data: PersonsCreateDTO,
  ) {
    return this.personService.create(churchId, data);
  }

  @Post(':churchId/firt-auth')
  async createWithNotAuth(
    @Param('churchId') churchId: string,
    @Body() data: PersonsCreateDTO,
  ) {
    return this.personService.create(churchId, data);
  }

  @Get('global')
  async findGlobal() {
    return this.personService.findGlobal();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':churchId')
  async findAll(@Param('churchId') churchId: string) {
    return this.personService.findAll(churchId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':churchId/:id')
  async findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':churchId/find-with-name')
  async findWithName(
    @Param('churchId') churchId: string,
    @Body() data: findWithNameType,
    @Query('skip') skip: number,
  ) {
    if (skip === undefined) {
      skip = 0;
    }
    return this.personService.findWithName(churchId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: PersonsUpdateDTO) {
    return this.personService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.personService.delete(id);
  }
}

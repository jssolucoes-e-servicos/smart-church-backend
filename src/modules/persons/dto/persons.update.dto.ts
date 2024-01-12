import { PartialType } from '@nestjs/swagger';
import { PersonsCreateDTO } from 'src/modules/persons/dto/persons.create.dto';

export class PersonsUpdateDTO extends PartialType(PersonsCreateDTO){};

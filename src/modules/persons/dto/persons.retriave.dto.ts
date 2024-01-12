import { PartialType } from '@nestjs/swagger';
import { MongoIdValidator } from 'src/commons/validators';
import { StringValidator } from 'src/commons/validators/string.validator';
import { PersonsCreateDTO } from 'src/modules/persons/dto/persons.create.dto';

export class PersonsRetrieveDTO extends PartialType(PersonsCreateDTO) {
  @MongoIdValidator({ fieldName: 'id' })
  id: string;

  @StringValidator({ fieldName: 'createdAt' })
  createdAt: Date;

  @StringValidator({ fieldName: 'updatedAt' })
  updatedAt: Date;
}

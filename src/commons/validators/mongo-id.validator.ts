import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

interface IValidatorType {
  fieldName: string;
  label?: string;
  optional?: boolean;
  description?: string;
}

export function MongoIdValidator({
  fieldName,
  label,
  optional = false,
  description,
}: IValidatorType) {
  if (label === undefined) label = fieldName;

  if (description === undefined) description = label;

  if (optional === true) {
    return applyDecorators(
      IsMongoId({
        message: `Campo ${label} em formáto inválido`,
      }),
      IsOptional(),
      ApiPropertyOptional({
        name: fieldName,
        description: description,
      }),
    );
  }
  return applyDecorators(
    IsMongoId({
      message: `Campo ${label} em formáto inválido`,
    }),
    IsNotEmpty({
      message: `Campo ${label} é requirido`,
    }),
    ApiProperty({
      name: fieldName,
      description: description,
    }),
  );
}

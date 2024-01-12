import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';



export function StringValidator({
  fieldName,
  label,
  minLength = 0,
  optional = false,
  description,
  exemple = '',
}: IStringValidator) {
  if (label === undefined) label = fieldName;

  if (description === undefined) description = label;

  if (optional === false) {
    if (minLength > 0) {
      return applyDecorators(
        IsString({
          message: `Campo ${label} em formáto inválido`,
        }),
        MinLength(minLength, {
          message: `Campo ${label} com carcéres insuficientes, o mínimo é ${minLength}`,
        }),
        IsOptional(),
        ApiPropertyOptional({
          name: fieldName,
          description: description,
          example: exemple,
        }),
      );
    }
    return applyDecorators(
      IsString({
        message: `Campo ${label} em formáto inválido`,
      }),
      IsOptional(),
      ApiPropertyOptional({
        name: fieldName,
        description: description,
        example: exemple,
      }),
    );
  }

  if (minLength > 0) {
    return applyDecorators(
      IsString({
        message: `Campo ${label} em formáto inválido`,
      }),
      MinLength(minLength, {
        message: `Campo ${label} com carcéres insuficientes, o mínimo é ${minLength}`,
      }),
      IsNotEmpty({
        message: `Campo ${label} é requirido`,
      }),
      ApiProperty({
        name: fieldName,
        description: description,
        example: exemple,
      }),
    );
  }
  return applyDecorators(
    IsString({
      message: `Campo ${label} em formáto inválido`,
    }),
    IsNotEmpty({
      message: `Campo ${label} é requirido`,
    }),
    ApiProperty({
      name: fieldName,
      description: description,
      example: exemple,
    }),
  );
}

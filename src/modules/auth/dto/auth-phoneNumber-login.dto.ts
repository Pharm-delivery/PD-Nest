import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthPhoneNumberLoginDto {
  @ApiProperty({ example: '+375295554433' })
  @Transform(lowerCaseTransformer)
  @Validate(IsExist, ['Customer'], {
    message: 'phoneNumberNotExists',
  })
  phoneNumber: string;
}

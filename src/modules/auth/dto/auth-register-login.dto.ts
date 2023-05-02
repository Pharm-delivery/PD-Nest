import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: '+375295554433' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['Customer'], {
    message: 'phoneNumberAlreadyExists',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}

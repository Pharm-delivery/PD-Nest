import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from 'src/modules/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateCustomerDto {
  @ApiProperty({ example: '+375295554433' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['Customer'], {
    message: 'phoneNumberAlreadyExists',
  })
  @IsPhoneNumber()
  phoneNumber: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  otp?: string | null;
}

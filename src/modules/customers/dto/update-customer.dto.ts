import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/roles/entities/role.entity';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { Status } from 'src/modules/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({ example: '+375295554433' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @Validate(IsNotExist, ['Customer'], {
    message: 'phoneNumberAlreadyExist',
  })
  @IsEmail()
  phoneNumber?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  otp?: string | null;
}

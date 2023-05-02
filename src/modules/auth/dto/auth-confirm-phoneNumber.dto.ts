import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthConfirmPhoneNumberDto {
  @ApiProperty({ example: '+375295554433' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  phoneNumber: string;

  @ApiProperty({ example: '111111' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  otp: string;
}

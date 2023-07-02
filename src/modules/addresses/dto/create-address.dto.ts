import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: '01-234' })
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 'st. Sadovaya 36' })
  @IsNotEmpty()
  address1: string;

  @ApiProperty({ example: 'app. 33' })
  address2: string | null;

  @ApiProperty({ example: '12' })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ example: '12' })
  @IsNotEmpty()
  lng: number;

  @ApiProperty({ example: 'Belarus' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Belarus' })
  @IsNotEmpty()
  city: string;
}

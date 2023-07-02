import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({ example: '01-234' })
  @IsOptional()
  zipCode: string;

  @ApiProperty({ example: 'st. Sadovaya 36' })
  @IsOptional()
  address1: string;

  @ApiProperty({ example: 'app. 33' })
  address2: string | null;

  @ApiProperty({ example: '12' })
  @IsOptional()
  lat: number;

  @ApiProperty({ example: '12' })
  @IsOptional()
  lng: number;

  @ApiProperty({ example: 'Belarus' })
  @IsOptional()
  country: string;

  @ApiProperty({ example: 'Belarus' })
  @IsOptional()
  city: string;
}

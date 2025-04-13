import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCapacityDto {
  @ApiProperty({ example: '10Watt' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: '10Watt' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: '10Watt' })
  @IsString()
  @IsNotEmpty()
  name_en: string;
}

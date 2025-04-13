import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({ example: 'XL' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'XL' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'XL' })
  @IsString()
  @IsNotEmpty()
  name_en: string;
}

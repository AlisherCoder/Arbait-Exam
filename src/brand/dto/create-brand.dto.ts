import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Makita' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Makita' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Makita' })
  @IsString()
  @IsNotEmpty()
  name_en: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShowcaseDto {
  @ApiProperty({ example: 'Show case' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Show case' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Show case' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'Bla Bla Bla ' })
  @IsString()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty({ example: 'Bla Bla Bla ' })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({ example: 'Bla Bla Bla ' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'link' })
  @IsString()
  @IsNotEmpty()
  link: string;
}

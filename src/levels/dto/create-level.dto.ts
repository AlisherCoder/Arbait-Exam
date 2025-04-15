import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ example: 'Beginner' })
  @IsNotEmpty()
  @IsString()
  name_uz: string;

  @ApiProperty({ example: 'Beginner' })
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @ApiProperty({ example: 'Beginner' })
  @IsNotEmpty()
  @IsString()
  name_en: string;
}

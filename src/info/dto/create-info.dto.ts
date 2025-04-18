import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateInfoDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: { instagram: 'instagramlink', telegram: 'telegramlink' },
  })
  @IsObject()
  @IsNotEmpty()
  links: object;

  @ApiProperty({ example: ['+998901234567', '+998991234567'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone: string[];
}

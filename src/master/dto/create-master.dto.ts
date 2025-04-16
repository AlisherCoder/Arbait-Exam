import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateMasterDto {
  @ApiProperty({ example: 'Alex Bob' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phone number format must be only: +998901234567.',
  })
  phone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: '1990-09-09' })
  @IsDate()
  @Type(() => Date)
  year: Date;

  @ApiProperty({ example: 'alex.img' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'pasport.jpg' })
  @IsString()
  @IsNotEmpty()
  passport_image: string;

  @ApiProperty({ example: 'Alex master sport' })
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({
    example: [
      {
        min_work_hours: 1,
        price_hourly: 40000,
        price_daily: 300000,
        experience: 1,
        level_id: 'level_id',
        profession_id: 'profession_id',
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MastersSkill)
  skills: MastersSkill[];
}

class MastersSkill {
  @IsInt()
  @Min(1)
  min_work_hours: number;

  @IsNumber()
  @IsPositive()
  price_hourly: number;

  @IsNumber()
  @IsPositive()
  price_daily: number;

  @IsInt()
  @Min(0)
  experience: number;

  @IsUUID()
  @IsNotEmpty()
  level_id: string;

  @IsUUID()
  @IsNotEmpty()
  profession_id: string;
}

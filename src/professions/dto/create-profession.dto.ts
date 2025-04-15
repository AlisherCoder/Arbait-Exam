import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProfessionDto {
  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(24)
  min_work_hours: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsPositive()
  price_hourly: number;

  @ApiProperty({ example: 400 })
  @IsNumber()
  @IsNumber()
  price_daily: number;

  @ApiProperty({ example: ['level_id', 'level_id'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  levels: string[];

  @ApiProperty({ example: ['tool_id', 'tool_id'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tools: string[];
}

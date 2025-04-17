import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export enum Measure {
  HOUR = 'HOUR',
  DAY = 'DAY',
}

export class CreateBacketitemDto {
  @ApiProperty({ example: 'tool_id' })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  tool_id?: string;

  @ApiProperty({ example: 'profession_id' })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  profession_id?: string;

  @ApiProperty({ example: 'level_id' })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  level_id?: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  count: number;

  @ApiProperty({ example: 'DAY' })
  @IsEnum(Measure)
  @IsNotEmpty()
  measure: Measure;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  time: number;
}

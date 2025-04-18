import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export enum Sort {
  full_name = 'full_name',
  experience = 'experience',
  isActive = 'isActive',
  year = 'year',
  min_work_hours = 'min_work_hours',
  price_hourly = 'price_hourly',
  price_daily = 'price_daily',
}

export class QueryMasterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  level_id?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  profession_id?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  year?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  min_work_hours?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price_hourly?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price_daily?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  experience?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';

  @IsOptional()
  @IsEnum(Sort)
  sortBy?: Sort;
}

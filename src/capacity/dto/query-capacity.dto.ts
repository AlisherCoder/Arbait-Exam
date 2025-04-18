import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class QueryCapacityDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name_uz?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name_ru?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name_en?: string;

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
  @IsEnum(['name_uz', 'name_ru', 'name_en'])
  sortBy?: 'name_uz' | 'name_ru' | 'name_en';
}

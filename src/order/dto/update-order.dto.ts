import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

enum StatusOrder {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}
export class UpdateOrderDto {
  @ApiProperty({ example: 'ACTIVE' })
  @IsEnum(StatusOrder)
  @IsNotEmpty()
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'FINISHED';

  @ApiProperty({ example: ['master_id', 'master_id'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  masters: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Good job' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'order_id' })
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ example: [{ star: 4.5, master_id: 'master_id' }] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MasterRatings)
  master_ratings: MasterRatings[];
}

class MasterRatings {
  @IsNumber()
  @IsPositive()
  star: number;

  @IsUUID()
  @IsNotEmpty()
  master_id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'Question' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'Answer' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

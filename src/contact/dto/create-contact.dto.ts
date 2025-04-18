import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Alex Fergison' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  full_name: string;

  @ApiProperty({ example: '+998953901313' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phone number format must be only: +998901234567.',
  })
  phone: string;

  @ApiProperty({ example: 'Adress' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

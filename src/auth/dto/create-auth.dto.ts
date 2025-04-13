import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
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

  @ApiProperty({ example: 'root' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: 'region_id' })
  @IsString()
  @IsNotEmpty()
  region_id: string;

  @ApiProperty({ example: 'USER_FIZ' })
  @IsString()
  @IsNotEmpty()
  role: 'USER_FIZ' | 'USER_YUR';
}

export class LoginAuthDto extends PickType(CreateAuthDto, [
  'phone',
  'password',
]) {}

export class SendOtpDto extends PickType(CreateAuthDto, ['phone']) {}

export class ActivateDto extends PickType(CreateAuthDto, ['phone']) {
  @ApiProperty({ example: '09121' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ResetPasswordDto extends PickType(ActivateDto, ['phone', 'otp']) {
  @ApiProperty({ example: 'root1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

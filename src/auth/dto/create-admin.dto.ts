import { ApiProperty,PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class CreateAdminDto extends PickType(CreateAuthDto, [
  'full_name',
  'phone',
  'password',
  'region_id',
]) {
  @ApiProperty({ example: 'SUPER_ADMIN' })
  @IsEnum(['SUPER_ADMIN', 'VIEWER_ADMIN'])
  @IsString()
  @IsNotEmpty()
  role: 'SUPER_ADMIN' | 'VIEWER_ADMIN';
}

import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(
  PickType(CreateAuthDto, ['full_name', 'region_id']),
) {}

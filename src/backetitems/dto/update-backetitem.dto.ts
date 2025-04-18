import { PartialType, PickType } from '@nestjs/swagger';
import { CreateBacketitemDto } from './create-backetitem.dto';

export class UpdateBacketitemDto extends PartialType(
  PickType(CreateBacketitemDto, ['count', 'measure', 'time']),
) {}

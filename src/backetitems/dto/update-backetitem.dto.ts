import { PartialType } from '@nestjs/swagger';
import { CreateBacketitemDto } from './create-backetitem.dto';

export class UpdateBacketitemDto extends PartialType(CreateBacketitemDto) {}

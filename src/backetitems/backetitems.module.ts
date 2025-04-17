import { Module } from '@nestjs/common';
import { BacketitemsService } from './backetitems.service';
import { BacketitemsController } from './backetitems.controller';

@Module({
  controllers: [BacketitemsController],
  providers: [BacketitemsService],
})
export class BacketitemsModule {}

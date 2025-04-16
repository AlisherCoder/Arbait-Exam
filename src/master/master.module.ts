import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [MasterController],
  providers: [MasterService, UploadService],
})
export class MasterModule {}

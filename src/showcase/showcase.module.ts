import { Module } from '@nestjs/common';
import { ShowcaseService } from './showcase.service';
import { ShowcaseController } from './showcase.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [ShowcaseController],
  providers: [ShowcaseService, UploadService],
})
export class ShowcaseModule {}

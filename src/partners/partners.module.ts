import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, UploadService],
})
export class PartnersModule {}

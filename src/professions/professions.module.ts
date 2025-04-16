import { Module } from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { ProfessionsController } from './professions.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [ProfessionsController],
  providers: [ProfessionsService, UploadService],
})
export class ProfessionsModule {}

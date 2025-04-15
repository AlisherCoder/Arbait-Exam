import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CloudinaryService } from 'nestjs-cloudinary';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private uploadService: UploadService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 10 * 1024 ** 2 } }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    let { url } = await this.cloudinaryService.uploadFile(file);
    return { url };
  }

  deleteFile(FileUrl: string) {
    return this.uploadService.deleteFile(FileUrl);
  }
}

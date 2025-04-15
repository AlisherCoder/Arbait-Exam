import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async deleteFile(fileUrl: string) {
    try {
      let fileCode: string = fileUrl.split('/').at(-1)?.split('.')[0]!;
      const result = await cloudinary.uploader.destroy(fileCode);
    } catch (error) {
      console.log(error.message);
    }
  }
}

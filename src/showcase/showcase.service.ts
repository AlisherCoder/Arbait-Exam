import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ShowcaseService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createShowcaseDto: CreateShowcaseDto) {
    try {
      let data = await this.prisma.showcase.create({ data: createShowcaseDto });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.showcase.findMany();

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
    const { image } = updateShowcaseDto;
    try {
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      data = await this.prisma.showcase.update({
        where: { id },
        data: updateShowcaseDto,
      });

      if (image) {
        this.uploadService.deleteFile(data.image);
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      data = await this.prisma.showcase.delete({ where: { id } });

      this.uploadService.deleteFile(data.image);

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

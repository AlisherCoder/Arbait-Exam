import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class PartnersService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      let data = await this.prisma.partners.create({ data: createPartnerDto });

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
      let data = await this.prisma.partners.findMany();

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
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      data = await this.prisma.partners.update({
        where: { id },
        data: updatePartnerDto,
      });

      if (updatePartnerDto.image) {
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
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      data = await this.prisma.partners.delete({ where: { id } });
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

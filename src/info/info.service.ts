import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async create(createInfoDto: CreateInfoDto) {
    try {
      let data = await this.prisma.info.create({ data: createInfoDto });

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
      let data = await this.prisma.info.findMany();

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
      let data = await this.prisma.info.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found info');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    try {
      let data = await this.prisma.info.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found info');
      }

      data = await this.prisma.info.update({
        where: { id },
        data: updateInfoDto,
      });

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
      let data = await this.prisma.info.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found info');
      }

      data = await this.prisma.info.delete({ where: { id } });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

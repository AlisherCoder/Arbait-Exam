import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      const size = await this.prisma.size.findFirst({
        where: { name_uz: createSizeDto.name_uz },
      });

      if (size) {
        throw new ConflictException('Size already exists with name');
      }

      const data = await this.prisma.size.create({ data: createSizeDto });

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
      const data = await this.prisma.size.findMany();

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
      const data = await this.prisma.size.findUnique({
        where: { id },
        include: { Tool: true },
      });

      if (!data) {
        throw new NotFoundException('Not found size');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      const data = await this.prisma.size.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found size');
      }

      const updated = await this.prisma.size.update({
        where: { id },
        data: updateSizeDto,
      });

      return { data: updated };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.size.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found size');
      }

      const deleted = await this.prisma.size.delete({
        where: { id },
      });

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

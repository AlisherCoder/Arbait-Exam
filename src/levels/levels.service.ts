import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  async create(createLevelDto: CreateLevelDto) {
    try {
      const level = await this.prisma.level.findFirst({
        where: { name_uz: createLevelDto.name_uz },
      });

      if (level) {
        throw new ConflictException('Level already exists');
      }

      const data = await this.prisma.level.create({
        data: createLevelDto,
      });

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
      const data = await this.prisma.level.findMany();

      if (!data.length) {
        throw new NotFoundException('No levels found');
      }

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
      const data = await this.prisma.level.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('No level found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    try {
      const level = await this.prisma.level.findFirst({
        where: { name_uz: updateLevelDto.name_uz },
      });

      if (level) {
        throw new ConflictException('Level already exists');
      }

      const data = await this.prisma.level.update({
        where: { id },
        data: updateLevelDto,
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
      const data = await this.prisma.level.delete({ where: { id } });

      if (!data) {
        throw new NotFoundException('No level found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

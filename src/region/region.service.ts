import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      const region = await this.prisma.region.findFirst({
        where: { name_uz: createRegionDto.name_uz },
      });

      if (region) {
        throw new ConflictException('Region already exists');
      }

      const data = await this.prisma.region.create({
        data: createRegionDto,
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
      const data = await this.prisma.region.findMany();

      if (!data.length) {
        throw new NotFoundException('No regions found');
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
      const data = await this.prisma.region.findUnique({
        where: { id },
        include: { Users: true },
      });

      if (!data) {
        throw new NotFoundException('No region found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const { name_uz } = updateRegionDto;
    try {
      if (name_uz) {
        const region = await this.prisma.region.findFirst({
          where: { name_uz: updateRegionDto.name_uz },
        });

        if (region) {
          throw new ConflictException('Region already exists');
        }
      }

      const data = await this.prisma.region.update({
        where: { id },
        data: updateRegionDto,
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
      const data = await this.prisma.region.delete({ where: { id } });

      if (!data) {
        throw new NotFoundException('No region found');
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

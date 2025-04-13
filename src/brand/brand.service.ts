import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.prisma.brand.findFirst({
        where: { name_uz: createBrandDto.name_uz },
      });

      if (brand) {
        throw new ConflictException('Brand already exists with name');
      }

      const data = await this.prisma.brand.create({ data: createBrandDto });

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
      const data = await this.prisma.brand.findMany();

      if (!data.length) {
        throw new NotFoundException('Not found brands');
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
      const data = await this.prisma.brand.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const data = await this.prisma.brand.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      const updated = await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
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
      const data = await this.prisma.brand.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      const deleted = await this.prisma.brand.delete({
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

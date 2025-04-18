import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ToolsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createToolDto: CreateToolDto) {
    const { brand_id, size_id, capacity_id } = createToolDto;
    try {
      const brand = await this.prisma.brand.findUnique({
        where: { id: brand_id },
      });

      if (!brand) {
        throw new ConflictException('Not found brand with this brand id');
      }

      const size = await this.prisma.size.findUnique({
        where: { id: size_id },
      });

      if (!size) {
        throw new ConflictException('Not found size with this size id');
      }

      const capacity = await this.prisma.capacity.findUnique({
        where: { id: capacity_id },
      });

      if (!capacity) {
        throw new ConflictException('Not found capacity with this capacity id');
      }

      const tool = await this.prisma.tool.findUnique({
        where: { code: createToolDto.code },
      });

      if (tool) {
        throw new ConflictException('Tool already exists with this code');
      }

      const data = await this.prisma.tool.create({ data: createToolDto });

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
      const data = await this.prisma.tool.findMany();

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
      const data = await this.prisma.tool.findUnique({
        where: { id },
        include: { Professions: true },
      });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    try {
      const data = await this.prisma.tool.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      const updated = await this.prisma.tool.update({
        where: { id },
        data: updateToolDto,
      });

      if (updateToolDto.image) {
        await this.uploadService.deleteFile(data.image);
      }

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
      const data = await this.prisma.tool.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      const deleted = await this.prisma.tool.delete({
        where: { id },
      });

      await this.uploadService.deleteFile(deleted.image);

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

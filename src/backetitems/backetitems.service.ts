import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBacketitemDto } from './dto/create-backetitem.dto';
import { UpdateBacketitemDto } from './dto/update-backetitem.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class BacketitemsService {
  constructor(private prisma: PrismaService) {}

  async create(createBacketitemDto: CreateBacketitemDto, req: Request) {
    const { level_id, profession_id, tool_id } = createBacketitemDto;
    const user = req['user'];
    try {
      if (tool_id && (profession_id || level_id)) {
        throw new BadRequestException(
          'Profession, level and tool should not be together',
        );
      }

      const data = await this.prisma.backetItems.create({
        data: { ...createBacketitemDto, user_id: user.id },
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBacketitemDto: UpdateBacketitemDto) {
    try {
      const backet = await this.prisma.backetItems.findUnique({
        where: { id },
      });

      if (!backet) {
        throw new NotFoundException('Not found backet');
      }

      const data = await this.prisma.backetItems.update({
        where: { id },
        data: updateBacketitemDto,
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
      const backet = await this.prisma.backetItems.findUnique({
        where: { id },
      });

      if (!backet) {
        throw new NotFoundException('Not found backet');
      }

      const data = await this.prisma.backetItems.delete({
        where: { id },
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

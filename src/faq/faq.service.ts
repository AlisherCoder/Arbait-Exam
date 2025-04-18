import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryFaqDto } from './dto/query-faq.dto';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    try {
      let data = await this.prisma.fAQ.create({ data: createFaqDto });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryFaqDto) {
    const { page = 1, limit = 10, question } = query;

    const filter: any = {};

    if (question) filter.question = { mode: 'insensitive', contains: question };

    try {
      let data = await this.prisma.fAQ.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
      });

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
      let data = await this.prisma.fAQ.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found FAQ');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    try {
      let data = await this.prisma.fAQ.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found fAQ');
      }

      data = await this.prisma.fAQ.update({
        where: { id },
        data: updateFaqDto,
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
      let data = await this.prisma.fAQ.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found fAQ');
      }

      data = await this.prisma.fAQ.delete({ where: { id } });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

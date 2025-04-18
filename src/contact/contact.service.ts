import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    try {
      let data = await this.prisma.contact.create({ data: createContactDto });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryContactDto) {
    const { page = 1, limit = 10, orderBy = 'asc', full_name, phone } = query;

    const filter: any = {};

    if (full_name)
      filter.full_name = { mode: 'insensitive', contains: full_name };

    if (phone) filter.phone = { mode: 'insensitive', contains: phone };

    try {
      let data = await this.prisma.contact.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          full_name: orderBy,
        },
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
      let data = await this.prisma.contact.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found contact');
      }

      data = await this.prisma.contact.delete({ where: { id } });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

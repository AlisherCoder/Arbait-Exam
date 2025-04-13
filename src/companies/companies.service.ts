import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: createCompanyDto.user_id },
      });

      if (!user) {
        throw new NotFoundException('User not found with user_id');
      }

      const data = await this.prisma.company.create({
        data: createCompanyDto,
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
      const data = await this.prisma.company.findMany();

      if (!data.length) {
        throw new NotFoundException('Not found companies');
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
      const data = await this.prisma.company.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found company');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const data = await this.prisma.company.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found company');
      }

      const updatedCompany = await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });

      return { data: updatedCompany };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.company.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found company');
      }

      const deletedCompany = await this.prisma.company.delete({
        where: { id },
      });

      return { data: deletedCompany };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

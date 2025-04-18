import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();

      return { data: users };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          Company: true,
          Order: true,
          Region: true,
          Comment: true,
          BacketItems: {
            include: { Level: true, Profession: true, Tool: true },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { data: user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateAuthDto) {
    const { company, ...data } = updateUserDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (data.region_id) {
        const region = await this.prisma.region.findUnique({
          where: { id: data.region_id },
        });

        if (!region) {
          throw new NotFoundException('Region not found');
        }
      }

      if (company) {
        await this.prisma.company.update({
          where: { user_id: user.id },
          data: company,
        });
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: data,
        include: { Company: true },
      });

      return { data: updatedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const deletedUser = await this.prisma.user.delete({ where: { id } });

      return { data: deletedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

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

      if (!users.length) {
        throw new NotFoundException('Users not found');
      }

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
      const user = await this.prisma.user.findUnique({ where: { id } });

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
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: updateUserDto.region_id },
      });

      if (!region) {
        throw new NotFoundException('Region not found');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
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

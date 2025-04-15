import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessionsService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessionDto: CreateProfessionDto) {
    const { levels, tools, ...body } = createProfessionDto;
    try {
      const profession = await this.prisma.profession.findFirst({
        where: { name_uz: body.name_uz },
      });

      if (profession) {
        throw new ConflictException('Profession already exists with this name');
      }

      const levelsCount = await this.prisma.level.count({
        where: {
          id: {
            in: levels,
          },
        },
      });

      if (levels.length !== levelsCount) {
        throw new BadRequestException('Some level id does not exist.');
      }

      const toolsCount = await this.prisma.tool.count({
        where: {
          id: {
            in: tools,
          },
        },
      });

      if (tools.length !== toolsCount) {
        throw new BadRequestException('Some tool id does not exist.');
      }

      const levelsToConnect = levels.map((id) => ({ id }));
      const toolsToConnect = tools.map((id) => ({ id }));

      let data = await this.prisma.profession.create({
        data: {
          ...body,
          Tools: {
            connect: toolsToConnect,
          },
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

  async findAll() {
    return `This action returns all professions`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} profession`;
  }

  async update(id: string, updateProfessionDto: UpdateProfessionDto) {
    return `This action updates a #${id} profession`;
  }

  async remove(id: string) {
    return `This action removes a #${id} profession`;
  }
}

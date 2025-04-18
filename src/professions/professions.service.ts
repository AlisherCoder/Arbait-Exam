import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProfessionsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createProfessionDto: CreateProfessionDto) {
    const { levels, tools, ...body } = createProfessionDto;
    try {
      const profession = await this.prisma.profession.findFirst({
        where: { name_uz: body.name_uz },
      });

      if (profession) {
        throw new ConflictException('Profession already exists with this name');
      }

      const toolsCount = await this.prisma.tool.count({
        where: {
          id: {
            in: tools,
          },
        },
      });

      if (tools.length !== toolsCount) {
        throw new BadRequestException('Some tool id does not exists.');
      }

      const lvls = levels.map((lvl) => lvl.level_id);
      const lvlsCount = await this.prisma.level.count({
        where: {
          id: {
            in: lvls,
          },
        },
      });

      if (lvls.length !== lvlsCount) {
        throw new BadRequestException('Some level id does not exists.');
      }

      const toolsToConnect = tools.map((id) => ({ id }));
      const data = await this.prisma.profession.create({
        data: {
          ...body,
          Tools: {
            connect: toolsToConnect,
          },
        },
      });

      const level = levels.map((level) => ({
        ...level,
        profession_id: data.id,
      }));

      await this.prisma.levelsProfessions.createMany({ data: level });

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
      const data = await this.prisma.profession.findMany();

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
      const data = await this.prisma.profession.findUnique({
        where: { id },
        include: {
          LevelsProfessions: { include: { Profession: true, Level: true } },
          Tools: true,
        },
      });

      if (!data) {
        throw new NotFoundException('Not found profession');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProfessionDto: UpdateProfessionDto) {
    const { levels, tools, ...body } = updateProfessionDto;
    try {
      const data = await this.prisma.profession.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Not found profession');
      }

      if (levels?.length) {
        let lvls = levels.map((lvl) => lvl.level_id);

        const lvlsCount = await this.prisma.level.count({
          where: {
            id: {
              in: lvls,
            },
          },
        });

        if (lvls.length !== lvlsCount) {
          throw new BadRequestException('Some level id does not exists.');
        }
      }

      if (tools?.length) {
        const toolsCount = await this.prisma.tool.count({
          where: {
            id: {
              in: tools,
            },
          },
        });

        if (tools.length !== toolsCount) {
          throw new BadRequestException('Some tool id does not exists.');
        }
      }

      const updated = await this.prisma.profession.update({
        where: { id },
        data: body,
      });

      if (body.image) {
        this.uploadService.deleteFile(data.image);
      }

      if (levels?.length) {
        await this.prisma.levelsProfessions.deleteMany({
          where: { profession_id: data.id },
        });

        const level = levels.map((level) => ({
          ...level,
          profession_id: data.id,
        }));

        this.prisma.levelsProfessions.createMany({ data: level });
      }

      if (tools?.length) {
        const toolsToConnect = tools.map((id) => ({ id }));

        this.prisma.profession.update({
          where: { id },
          data: {
            Tools: {
              set: toolsToConnect,
            },
          },
        });
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
      const data = await this.prisma.profession.findUnique({
        where: { id },
        include: { LevelsProfessions: true, Tools: true },
      });

      if (!data) {
        throw new NotFoundException('Not found profession');
      }

      const deleted = await this.prisma.profession.delete({ where: { id } });

      this.uploadService.deleteFile(deleted.image);

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

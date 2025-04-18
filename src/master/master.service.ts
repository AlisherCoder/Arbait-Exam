import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { QueryMasterDto } from './dto/query-master.dto';

@Injectable()
export class MasterService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createMasterDto: CreateMasterDto) {
    const { skills, ...body } = createMasterDto;

    let lvlsid = skills.map((skill) => skill.level_id);
    lvlsid = Array.from(new Set(lvlsid));

    const prfsid = skills.map((skill) => skill.profession_id);

    try {
      const lvlsCount = await this.prisma.level.count({
        where: { id: { in: lvlsid } },
      });

      if (lvlsCount !== lvlsid.length) {
        throw new BadRequestException('Some level id does not exists');
      }

      const prfCount = await this.prisma.profession.count({
        where: { id: { in: prfsid } },
      });

      if (prfCount !== prfsid.length) {
        throw new BadRequestException('Some profession id does not exists');
      }

      const data = await this.prisma.master.create({
        data: { ...body, MasterSkills: { create: skills } },
        include: { MasterSkills: true },
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryMasterDto) {
    const {
      page = 1,
      limit = 10,
      orderBy = 'asc',
      sortBy = 'full_name',
      full_name,
      phone,
      level_id,
      profession_id,
      isActive,
      year,
      min_work_hours,
      price_daily,
      price_hourly,
      experience,
    } = query;

    let filter: any = {};
    let skillsfilter: any = {};

    if (full_name)
      filter.full_name = { mode: 'insensitive', contains: full_name };
    if (phone) filter.phone = { mode: 'insensitive', contains: phone };
    if (isActive) filter.isActive = isActive;
    if (year) filter.year = year;

    if (level_id) skillsfilter.level_id = level_id;
    if (profession_id) skillsfilter.profession_id = profession_id;
    if (min_work_hours) skillsfilter.min_work_hours = min_work_hours;
    if (price_daily) skillsfilter.price_daily = price_daily;
    if (price_hourly) skillsfilter.price_hourly = price_hourly;
    if (experience) skillsfilter.experience = experience;

    try {
      const data = await this.prisma.master.findMany({
        where: {
          ...filter,
          MasterSkills: {
            some: skillsfilter,
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

  async findOne(id: string) {
    try {
      const data = await this.prisma.master.findUnique({
        where: { id },
        include: {
          MasterRatings: { include: { Comment: { include: { user: true } } } },
          MasterSkills: { include: { Level: true, Profession: true } },
          Orders: {
            include: {
              OrderItems: {
                include: { Level: true, Profession: true, Tool: true },
              },
              User: true,
            },
          },
        },
      });

      if (!data) {
        throw new NotFoundException('Not found master');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    const { skills, ...body } = updateMasterDto;

    try {
      const data = await this.prisma.master.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found master');
      }

      if (skills?.length) {
        let lvlsid = skills.map((skill) => skill.level_id);
        lvlsid = Array.from(new Set(lvlsid));

        const lvlsCount = await this.prisma.level.count({
          where: { id: { in: lvlsid } },
        });

        if (lvlsCount !== lvlsid.length) {
          throw new BadRequestException('Some level id does not exists');
        }

        const prfsid = skills.map((skill) => skill.profession_id);
        const prfCount = await this.prisma.profession.count({
          where: {
            id: { in: prfsid },
          },
        });

        if (prfCount !== prfsid.length) {
          throw new BadRequestException('Some profession id does not exists');
        }
      }

      const updated = await this.prisma.master.update({
        where: { id },
        data: body,
        include: { MasterSkills: true },
      });

      if (skills?.length) {
        await this.prisma.masterSkills.deleteMany({
          where: { master_id: data.id },
        });

        await this.prisma.masterSkills.createMany({
          data: skills.map((skill) => ({ ...skill, master_id: data.id })),
        });
      }

      await this.uploadService.deleteFile(updated.image);
      await this.uploadService.deleteFile(updated.passport_image);

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
      const data = await this.prisma.master.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found master');
      }

      const deleted = await this.prisma.master.delete({ where: { id } });

      await this.uploadService.deleteFile(deleted.image);
      await this.uploadService.deleteFile(deleted.passport_image);

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

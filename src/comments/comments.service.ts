import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, req: Request) {
    const { master_ratings, ...body } = createCommentDto;
    const user = req['user'];
    try {
      const data = await this.prisma.comment.create({
        data: {
          ...body,
          user_id: user.id,
          MasterRatings: {
            create: master_ratings,
          },
        },
        include: {
          MasterRatings: { include: { Master: true } },
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

  async remove(id: string, req: Request) {
    const user = req['user'];
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        throw new NotFoundException(`Comment  not found`);
      }

      if (comment.user_id !== user.id && !['ADMIN'].includes(user.role)) {
        throw new ForbiddenException('Not allowed');
      }

      await this.prisma.comment.delete({
        where: { id },
      });

      return { data: comment };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

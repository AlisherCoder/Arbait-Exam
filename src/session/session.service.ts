import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async remove(id: string) {
    try {
      let session = await this.prisma.session.findUnique({ where: { id } });

      if (!session) {
        throw new NotFoundException('Not found session');
      }

      let deleted = await this.prisma.session.delete({ where: { id } });

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

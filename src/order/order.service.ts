import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, req: Request) {
    const user = req['user'];
    const { order_items, location, ...body } = createOrderDto;
    try {
      const data = await this.prisma.order.create({
        data: {
          ...body,
          location: {
            ...location,
          },
          User: {
            connect: { id: user.id },
          },
          OrderItems: {
            create: order_items,
          },
        },
        include: { OrderItems: true },
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
      const data = await this.prisma.order.findMany();

      if (!data.length) {
        throw new NotFoundException('Orders not found');
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
      const data = await this.prisma.order.findUnique({
        where: { id },
        include: {
          User: true,
          OrderItems: {
            include: { Profession: true, Level: true, Tool: true },
          },
        },
      });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { status, masters } = updateOrderDto;
    try {
      const data = await this.prisma.order.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      const countMasters = await this.prisma.master.count({
        where: { id: { in: masters } },
      });

      if (countMasters !== masters.length) {
        throw new BadRequestException('Some master id does not exists');
      }

      const updated = await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
      });

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
      const data = await this.prisma.order.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      const deleted = await this.prisma.order.delete({
        where: { id },
      });

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

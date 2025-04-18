import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { BacketitemsService } from './backetitems.service';
import { CreateBacketitemDto } from './dto/create-backetitem.dto';
import { UpdateBacketitemDto } from './dto/update-backetitem.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('backetitems')
export class BacketitemsController {
  constructor(private readonly backetitemsService: BacketitemsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createBacketitemDto: CreateBacketitemDto,
    @Req() req: Request,
  ) {
    return this.backetitemsService.create(createBacketitemDto, req);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBacketitemDto: UpdateBacketitemDto,
  ) {
    return this.backetitemsService.update(id, updateBacketitemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backetitemsService.remove(id);
  }
}

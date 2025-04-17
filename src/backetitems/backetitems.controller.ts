import { Controller, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { BacketitemsService } from './backetitems.service';
import { CreateBacketitemDto } from './dto/create-backetitem.dto';
import { UpdateBacketitemDto } from './dto/update-backetitem.dto';
import { Request } from 'express';

@Controller('backetitems')
export class BacketitemsController {
  constructor(private readonly backetitemsService: BacketitemsService) {}

  @Post()
  create(
    @Body() createBacketitemDto: CreateBacketitemDto,
    @Req() req: Request,
  ) {
    return this.backetitemsService.create(createBacketitemDto, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBacketitemDto: UpdateBacketitemDto,
  ) {
    return this.backetitemsService.update(id, updateBacketitemDto);
  }
}

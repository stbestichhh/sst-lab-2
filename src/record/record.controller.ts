import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get(':id')
  public get(@Param('id') recordId: string) {
    return this.recordService.get(recordId);
  }

  @Get()
  public getAll(@Query() options: { userId?: number; categoryId?: number }) {
    if (!options.userId && !options.categoryId) {
      throw new BadRequestException('No query params provided');
    }
    return this.recordService.getAll(options);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() dto: CreateRecordDto) {
    return this.recordService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') recordId: string) {
    return this.recordService.delete(recordId);
  }
}

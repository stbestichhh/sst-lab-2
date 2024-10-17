import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService, Entity } from '../database/database.service';
import { CreateRecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(private readonly dbService: DatabaseService) {}

  public get(recordId: number) {
    const record = this.dbService.get('records', recordId);
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  public getAll(options: { userId?: number, categoryId?: number }) {
    return this.dbService.getAll('records').filter((entity) => {
      const data = entity.data as CreateRecordDto;
      if (data.userId === Number(options?.userId) || data.categoryId === Number(options?.categoryId)) {
        return entity;
      }
    });
  }

  public create(data: CreateRecordDto) {
    const record: Entity = {
      id: data.id,
      data: {},
    };
    delete data.id;
    record['data'] = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    this.dbService.create('records', record);
    return record;
  }

  public delete(recordId: number) {
    return this.dbService.delete('records', recordId);
  }
}

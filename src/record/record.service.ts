import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto';
import { RecordRepository } from './record.repository';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async get(recordId: string) {
    return await this.recordRepository.findByPk(recordId);
  }

  public async getAll(options: { userId?: number; categoryId?: number }) {
    return await this.recordRepository.findAll(options);
  }

  public async create(dto: CreateRecordDto) {
    return await this.recordRepository.create(dto);
  }

  public async delete(recordId: string) {
    return await this.recordRepository.delete(recordId);
  }
}

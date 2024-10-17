import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {
  public static register(tables: string[]) {
    const dbService = new DatabaseService();
    dbService.init(tables);
    return this;
  }
}

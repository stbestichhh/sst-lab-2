import { Injectable } from '@nestjs/common';
import { DatabaseException } from './database.exception';

export interface Entity {
  id: number;
  data: object;
}

@Injectable()
export class DatabaseService {
  private static dbHashMap: Record<string, Entity[]> = {};

  public getAll(tableName: string) {
    return DatabaseService.dbHashMap?.[tableName];
  }

  public get(tableName: string, id: number) {
    if (!(tableName in DatabaseService.dbHashMap)) {
      throw new DatabaseException(`Table ${tableName} does not exists`);
    }
    return DatabaseService.dbHashMap?.[tableName].find(
      (entity) => entity.id === Number(id),
    );
  }

  public create(tableName: string, entity: Entity) {
    if (this.get(tableName, entity.id)) {
      throw new DatabaseException(
        `Entity ${JSON.stringify(entity)} already exists in ${tableName}`,
      );
    }
    DatabaseService.dbHashMap?.[tableName].push(entity);
  }

  public update(tableName: string, id: number, data: object) {
    const found = this.get(tableName, id);
    if (!found) {
      throw new DatabaseException(
        `Entity with id: ${id} not found in ${tableName}`,
      );
    }
    this.delete(tableName, id);
    DatabaseService.dbHashMap?.[tableName].push({
      id: found.id,
      data: {
        ...Object.assign(found.data, data),
      },
    });
  }

  public delete(tableName: string, id: number) {
    const found = this.get(tableName, id);
    if (!found) {
      throw new DatabaseException(
        `Entity with id: ${id} not found in ${tableName}`,
      );
    }
    DatabaseService.dbHashMap?.[tableName].splice(
      DatabaseService.dbHashMap?.[tableName].indexOf(found),
      1,
    );
  }

  public init(tableNames: string[]) {
    for (const name of tableNames) {
      DatabaseService.dbHashMap[name] = [];
    }
  }

  public drop(tableName?: string) {
    if (tableName) {
      return delete DatabaseService.dbHashMap[tableName];
    }
    DatabaseService.dbHashMap = {};
  }
}

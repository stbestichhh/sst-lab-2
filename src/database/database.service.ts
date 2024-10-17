import { Injectable } from '@nestjs/common';

export interface Entity {
  id: number;
  data: object;
}

@Injectable()
export class DatabaseService {
  private dbHashMap: Record<string, Entity[]> = {};

  public getAll(tableName: string) {
    return this.dbHashMap?.[tableName];
  }

  public get(tableName: string, id: number) {
    return this.dbHashMap?.[tableName].find((entity) => entity.id === id);
  }

  public create(tableName: string, entity: Entity) {
    if (this.get(tableName, entity.id)) {
      throw new Error(
        `Entity ${JSON.stringify(entity)} already exists in ${tableName}`,
      );
    }
    this.dbHashMap?.[tableName].push(entity);
  }

  public update(tableName: string, id: number, data: object) {
    const found = this.get(tableName, id);
    if (!found) {
      throw new Error(`Entity with id: ${id} not found in ${tableName}`);
    }
    this.delete(tableName, id);
    this.dbHashMap?.[tableName].push({
      id: found.id,
      data,
    });
  }

  public delete(tableName: string, id: number) {
    const found = this.get(tableName, id);
    if (!found) {
      throw new Error(`Entity with id: ${id} not found in ${tableName}`);
    }
    this.dbHashMap?.[tableName].splice(
      this.dbHashMap?.[tableName].indexOf(found),
      1,
    );
  }

  public init(tableNames: string[]) {
    for (const name of tableNames) {
      this.dbHashMap[name] = [];
    }
  }

  public drop(tableName?: string) {
    if (!tableName) {
      return delete this.dbHashMap[tableName];
    }
    this.dbHashMap = {};
  }
}

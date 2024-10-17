import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  public get(userId: number) {
    const user = this.dbService.get('users', userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public getAll() {
    return this.dbService.getAll('users');
  }

  public create(data: CreateUserDto) {
    this.dbService.create('users', data);
    return { user: data };
  }

  public update(userId: number, data: UpdateUserDto) {
    this.dbService.update('users', userId, data);
    return { user: { id: userId, data } };
  }

  public delete(userId: number) {
    return this.dbService.delete('users', userId);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async get(userId: string) {
    return await this.userRepository.findByPk(userId);
  }

  public async getAll() {
    return await this.userRepository.findAll();
  }

  public async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  public async update(userId: string, dto: UpdateUserDto) {
    return await this.userRepository.update(userId, dto);
  }

  public async delete(userId: string) {
    return await this.userRepository.delete(userId);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async get(userId: string) {
    return await this.userRepository.findByPk(userId);
  }

  public async getByEmail(email: string) {
    return await this.userRepository.findOne({
      email,
    });
  }

  public async getAll() {
    return await this.userRepository.findAll();
  }

  public async create(dto: CreateUserDto) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(dto.password, salt);
    return await this.userRepository.create({
      ...dto,
      password: hash,
    });
  }

  public async update(userId: string, dto: UpdateUserDto) {
    return await this.userRepository.update(userId, dto);
  }

  public async delete(userId: string) {
    return await this.userRepository.delete(userId);
  }
}

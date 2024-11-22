import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { Category } from '../database/models';
import { CategoryRepository } from './category.repository';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, JwtStrategy],
  imports: [DatabaseModule.forFeature([Category])],
})
export class CategoryModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [],
  providers: [AppService],
  imports: [UsersModule, DatabaseModule, CategoryModule],
})
export class AppModule {}

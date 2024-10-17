import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [],
  providers: [AppService],
  imports: [UsersModule, DatabaseModule],
})
export class AppModule {}

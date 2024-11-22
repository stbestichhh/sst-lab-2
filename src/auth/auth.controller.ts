import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { User } from '../database/models';
import { AuthService } from './auth.service';
import { CurrentUser } from './currentUser.decorator';
import { LocalGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  public async signup(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  public async signin(@CurrentUser() user: User) {
    return await this.authService.login(user);
  }
}

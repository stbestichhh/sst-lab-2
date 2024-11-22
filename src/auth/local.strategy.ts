import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    const pwMath = await bcrypt.compare(password, user.password);

    if (!pwMath) {
      throw new UnauthorizedException(`Credentials are incorrect`);
    }

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '../database/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return { authentication_token: await this.jwtService.signAsync(payload) };
  }
}

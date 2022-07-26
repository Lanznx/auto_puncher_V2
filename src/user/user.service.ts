import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomException } from 'src/exception/custom.exception';
import { Duration, DateTime } from 'luxon';

@Injectable()
export class UserService {
  private jwtService: JwtService;
  constructor(private repo: UserRepository) {
    this.jwtService = new JwtService();
  }
  async getMyRecord(username: string) {
    const result = await this.repo.getMyRecord(username);
    return result;
  }

  async signUp(user) {
    const userResult = await this.repo.findUserByName(user.username);
    if (userResult !== null) {
      throw new CustomException(1016);
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    this.repo.signUp(user);
    const token = await this.signToken(user.username, user.email);
    return token;
  }
  encryptToken(payload, secret) {
    return this.jwtService.sign(payload, { secret: secret });
  }
  async verifyPassword(hash: string, password: string) {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }

  async signIn(username: string, password: string) {
    const user = await this.repo.findUserByName(username);
    let currentToken = null;
    if (!user) {
      throw new CustomException(1005);
    }
    const isVerify = this.verifyPassword(user.password, password);
    if (!isVerify) {
      throw new CustomException(1003);
    }
    currentToken = await this.signToken(user.username, user.email);
    const result = {
      token: currentToken,
    };

    return result;
  }

  async signToken(username, email) {
    const tokenDuration = Duration.fromObject({ days: 30 });
    const dateTime = DateTime.utc();
    const now = Math.round(dateTime.ts / 1000);
    const expired = Math.round(dateTime.plus(tokenDuration).ts / 1000);
    const token = await this.encryptToken(
      {
        exp: expired,
        iat: now,
        username: username,
        email: email,
      },
      process.env.JWT_SECRET_KEY,
    );
    return token;
  }

  async verifyToken(token) {
    const result = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return result;
  }
}

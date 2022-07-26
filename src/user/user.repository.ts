import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('User')
    private user: typeof User,
  ) {}
  async getMyRecord(username) {
    const result = await this.user.findOne({
      where: { username: username },
    });
    return result;
  }
  async signUp(user) {
    const result = await this.user.create({
      username: user.username,
      password: user.password,
      email: user.email,
    });
    return result;
  }
  async findUserByName(username) {
    const result = await this.user.findOne({
      where: { username: username },
    });
    return result;
  }
}

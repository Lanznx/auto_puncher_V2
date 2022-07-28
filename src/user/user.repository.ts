import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('User')
    private user: typeof User,
  ) {}
  async getMyData(username) {
    const result = await this.user.findOne({
      where: { username: username },
    });
    return result;
  }

  async getAllSubscribedUsers() {
    const result = await this.user.findAll({ where: { subscribe: 1 } });
    return result;
  }

  async startSubscribe(username) {
    const result = await this.user.update(
      {
        subscribe: 1,
      },
      {
        where: { username: username },
      },
    );
    return result;
  }

  async cancelSubscribe(username) {
    const result = await this.user.update(
      {
        subscribe: 0,
      },
      {
        where: { username: username },
      },
    );
    return result;
  }

  async signUp(user) {
    const result = await this.user.create({
      username: user.username,
      password: user.password,
      email: user.email,
      subscribe: false,
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

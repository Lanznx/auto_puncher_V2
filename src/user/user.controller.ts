import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() user: CreateUserDto) {
    const result = await this.userService.signUp(user);
    return { success: true, data: result };
  }

  @Post('signIn')
  @HttpCode(200)
  async signIn(@Body() data: { username: string; password: string }) {
    const result = await this.userService.signIn(data.username, data.password);
    return { success: true, data: result };
  }

  @Get('myData')
  @HttpCode(200)
  async getMyData(@Body() data: { tokenData }) {
    const result = await this.userService.getMyData(data.tokenData.username);
    return { success: true, data: result };
  }

  @Get('start')
  @HttpCode(200)
  async startSubscribe(@Body() data: { tokenData }) {
    const result = await this.userService.startSubscribe(
      data.tokenData.username,
    );
    if (result === 1)
      return { success: true, message: 'successfully subscribe!!' };
    else return { success: false, message: 'already subscribed!!' };
  }

  @Get('cancel')
  @HttpCode(200)
  async cancelSubscribe(@Body() data: { tokenData }) {
    const result = await this.userService.cancelSubscribe(
      data.tokenData.username,
    );
    if (result === 1)
      return { success: true, message: 'successfully cancel subscribe!!' };
    else return { success: false, message: 'already cancel subscribed!!' };
  }
}

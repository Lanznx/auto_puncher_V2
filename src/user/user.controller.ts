import {
  Body,
  Controller,
  Get,
  Head,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
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

  @Post('myData')
  @HttpCode(200)
  async getMyData(@Body() data: { username: string }) {
    const result = await this.userService.getMyData(data.username);
    return { success: true, data: result };
  }

  @Post('cancel')
  @HttpCode(200)
  async cancel(@Body() data: { username: string }) {
    return data;
  }
}

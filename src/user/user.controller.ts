import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignForSheetDto } from './dto/user.dto';

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

  //   @Post('record')
  //   @HttpCode(201)
  //   async addrecord(@Body() signForSheetDto: SignForSheetDto) {}

  @Post('myRecord')
  @HttpCode(200)
  async getMyRecord(@Body() data: { username: string }) {
    const result = await this.userService.getMyRecord(data.username);
    return { success: true, data: result };
  }
}

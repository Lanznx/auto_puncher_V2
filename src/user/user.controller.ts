import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse()
  @ApiHeader({
    name: 'token',
    description: 'a user session_token',
  })
  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() user: CreateUserDto) {
    const result = await this.userService.signUp(user);
    return { success: true, data: result };
  }
  @ApiOkResponse()
  @ApiHeader({
    name: 'token',
    description: 'a user session_token',
  })
  @Post('signIn')
  @HttpCode(200)
  async signIn(@Body() data: { username: string; password: string }) {
    const result = await this.userService.signIn(data.username, data.password);
    return { success: true, data: result };
  }
  @ApiOkResponse()
  @ApiHeader({
    name: 'token',
    description: 'a user session_token',
  })
  @Get('myData')
  @HttpCode(200)
  async getMyData(@Body() data: { tokenData }) {
    const result = await this.userService.getMyData(data.tokenData.username);
    return { success: true, data: result };
  }
  @ApiOkResponse()
  @ApiHeader({
    name: 'token',
    description: 'a user session_token',
  })
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
  @ApiOkResponse()
  @ApiHeader({
    name: 'token',
    description: 'a user session_token',
  })
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

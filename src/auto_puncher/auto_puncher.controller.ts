import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { SignForSheetDto } from 'src/auto_puncher/dto/auto_puncher.dto';
import { AutoPuncherService } from './auto_puncher.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
const CronJob = require('cron').CronJob;

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('auto-puncher/record')
export class AutoPuncherController {
  constructor(private autoPuncherService: AutoPuncherService) {}

  @Get('trigger')
  async trigger(@Body() data: { token }) {
    const result = await this.autoPuncherService.punchAllUserSheet();
    return result;
  }

  job = new CronJob(
    '0 30 8 * * 1-5',
    () => {
      this.autoPuncherService.punchAllUserSheet();
    },
    null,
    true,
    'Asia/Taipei',
  );

  @Post('edit')
  @HttpCode(201)
  async addRecord(@Body() data: SignForSheetDto) {
    const result = await this.autoPuncherService.addRecord(data);
    return result;
  }

  @Get()
  @HttpCode(200)
  async getRecord(@Body() data: { tokenData }) {
    return this.autoPuncherService.getRecord(data.tokenData.username);
  }

  @Put('edit')
  @HttpCode(200)
  async updateRecord(@Body() data: SignForSheetDto) {
    return this.autoPuncherService.updateRecord(data);
  }

  @Delete()
  @HttpCode(200)
  async deleteRecord(@Body() data: { tokenData }) {
    return this.autoPuncherService.deleteRecord(data.tokenData.username);
  }
}

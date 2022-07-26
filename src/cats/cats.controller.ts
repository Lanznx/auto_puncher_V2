import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async find_all_cats() {
    return this.catsService.find_all_cats();
  }

  @Get('/:id')
  async find(@Param() params) {
    const result = await this.catsService.find_cat_by_id(params.id);
    return result;
  }

  @Post('friend')
  @HttpCode(201)
  create_cat_friend(
    @Body() data: { name: string; age: number; whose_friend: string },
  ) {
    return this.catsService.create_cat_friend(data);
  }

  @Post()
  @HttpCode(201)
  async create_cat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create_cat(createCatDto);
  }

  @Put()
  @HttpCode(200)
  async update_cat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.update_cat(createCatDto);
  }

  @Delete()
  @HttpCode(200)
  async delete_cat_by_name(@Body() data: { name: string }) {
    return this.catsService.delete_cat(data.name);
  }
}

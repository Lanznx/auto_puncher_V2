import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto';

const cats = {
  0: 'Larry',
  1: 'Hank',
};

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'this is all the cats';
  }
  @Get('/:id')
  find(@Param() params) {
    return { cat_name: cats[params.id] };
  }
  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto) {
    return `Your new cat is ${createCatDto.name}`;
  }
}

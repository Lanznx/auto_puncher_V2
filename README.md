<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 分享架構

## Nest 是什麼？

# Quick Start

### 安裝 nest

```sql
sudo npm i -g @nestjs/cli
```

### 創建專案資料夾（請自行代換 `project-name` ）

```sql
nest new project-name 
```

```sql
npm run start:dev
```

當當！你已經用 nsetJS 做出一個小小的專案了

### 用 `commamd line` 製作出一組 controller

```sql
nest g controller cats
```

### 如何 GET ？

舉例： `cat.contriller.ts`

```jsx
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get("abc")
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

route →  GET `/cats/abc`

[NestJS versus Express](https://www.notion.so/a5b1cf207a4d40a19bf3cf7c2929dbdb)

### 如何取得 GET 參數？

```jsx
import { Controller, Get, Param } from '@nestjs/common';

const cats = {
  0: 'Larry',
  1: 'Hank',
};

@Controller('cats')
export class CatsController {
  @Get('/:id')
  find(@Param() params) {
    return { cat_name: cats[params.id] };
  }
}
```

request → [`http://localhost:3000/cats/0`](http://localhost:3000/cats/0)

response → `{"cat_name":"Larry"}`

### 如何 POST ?

```jsx
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto';

const cats = {
  0: 'Larry',
  1: 'Hank',
};

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto) {
    return `Your new cat is ${createCatDto.name}`;
  }
}
```

# eslint 排版問題

安裝 `prettier eslint` 到 VScode

`shift` + `command` + `p` → 輸入 `format document...`

選擇 `prettier eslint`
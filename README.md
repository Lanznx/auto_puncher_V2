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

跟 express 一樣是後端的框架，對於 [DDD (Domain Driven Design)](https://ithelp.ithome.com.tw/articles/10216645)友善, 同時也支援 [TypeScript](https://medium.com/tkd-giant/typescript%E5%85%A5%E9%96%80-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-d659bb592810)！

註：相對 Express 很肥，個人覺得不適合個人專案，部署會遇到免費主機記憶體不足的困難

# Quick Start

## 安裝

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

當當！你已經用 nsetJS 做出一個小小的專案，並且把它跑起來了！

專案架構如下圖：

```jsx
.
├─ dist
├─ node_modules
├─ src
   ├─ app.controller.ts
   ├─ app.controller.spec.ts
   ├─ app.module.ts
   ├─ app.service.ts
   └─ main.ts
├─ test
   ├─ app.e2e-spec.ts
   └─ jest-e2e.json
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.build.json
└─ README.md
```

## Controller

![截圖 2022-08-03 11.23.45.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a723e76-29f6-4df1-9c38-b9a24adfb02b/%E6%88%AA%E5%9C%96_2022-08-03_11.23.45.png)

### 用 `commamd line` 製作出一組 controller

```sql
nest generate controller cats
```

### 用 `commamd line` 製作出一組 service

```jsx
nest generate service cats
```

### 如何 GET ？

舉例：

```tsx
// 這裡是 controller

import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}
	@Get('abc')
  async find_all_cats() {
    return this.catsService.find_all_cats();
  }
}
```

因為 `@Controller` 裡面有 `'cats'` ，加上 `@Get` 裡面也放了 `'abc'` 

所以 route 會是  GET `/cats/abc` 

在這邊可以注意到：controller 會去呼叫 service 的函式，完成邏輯上的實作

也就是說跟傳統的 MVC 不一樣，商業邏輯會交給比較底層的 service 去做

controller 變得很像是遙控器，只要呼叫某某 service A 跟 某某 service B 就可以完成囉

```tsx
// 這裡是 service

import { Injectable } from '@nestjs/common';
import { CatsRepository } from './cat.repository';
@Injectable()
export class CatsService {
  constructor(private repo: CatsRepository) {}
  find_all_cats() {
    return this.repo.find_all_cats();
  }
}
```

### 裝飾器

[NestJS versus Express](https://www.notion.so/302673466c4d4bfb8e8046958cab24d2)

### 如何取得 GET 參數？

```jsx
// 這裡是 controller
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

```tsx
// 這裡是 controller

import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

const cats = {
  0: 'Larry',
  1: 'Hank',
};

@Controller('cats')
export class CatsController {
	@Post('friend')
  @HttpCode(201)
  createCatFriend(
    @Body() data: { name: string; age: number; whose_friend: string },
  ) {
    return `the cat ${data.name} is ${data.whose_friend}'s friend`;
  }
}
```

## Repository (Model)

假設前面 create 的 cat 已經寫入到你的資料庫裡面了，那我們要怎麼樣去做資料的 Update 呢？

### 如何 Update？

```tsx
// 這裡是 entity

import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;
}
```

```tsx
// 這裡是 repository

import { Inject, Injectable } from '@nestjs/common';
import { Cat } from 'src/entity/cat.entity';

@Injectable()
export class CatsRepository {
  constructor(
    @Inject('Cat')
    private cat: typeof Cat,
  ) {}

async update_cat(CreateCatDto) {
    const result = await this.cat.update(
      {
        age: CreateCatDto.age,
        breed: CreateCatDto.breed,
      },
      {
        where: {
          name: CreateCatDto.name,
        },
      },
    );
    return result;
  }

}
```

## DTO

### 使用 **Data Transfer Object（資料傳輸物件）過濾資料**

首先你需要安裝 class validator 跟 class transformer

```tsx
npm i --save class-validator class-transformer
```

```jsx
// 這裡是 dto

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
```

再來你就可以設定各種裝飾器，限制你的參數一定要符合某些規範

在這邊我設定了： `@IsNotEmpty` , `@IsString` 表示些參數都不能是空的，而且一定要是 String 的 data type 

```tsx
// 這裡是 controller
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
}
```

接下來要在 `signUp` 函式裡面的變數型態做點手腳：user 的資料型態要設定成 `CreateUserDto`

如此一來，當你再傳參數進去 `signUp` 的時候，dto 就會自動去檢查變數型態囉！

## Middleware

今天如果用戶要做一些需要權限才能做的事情，但如果一直登入、輸入密碼又很麻煩

這時候就需要 middleware 啦！

我們讓 request 在碰到 controller 之前，先經過 middleware 作處理

我在 middleware 裏面呼叫了 `userService` 的 `verifyToken` 來驗證 user 的身份是否有效

若無效的話就會在 middleware 這裡擋住這次的 request，不會讓他進到 controller 做進一步的處理

反之，若 token 驗證後是有效的，就會透過 `next()` 進去下一個 middleware，但由於這邊沒有設計更多 middleware，所以會直接進去 controller 做事！

```tsx
// 這裡是 middleware
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { CustomException } from 'src/exception/custom.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.get('Authorization');
    if (!token) {
      throw new CustomException(1032);
    }
    const result = await this.userService.verifyToken(token);
    if (!result['isValid']) {
      throw new CustomException(1032);
    }
    req.body.tokenData = result.data;

    next();
  }
}
```

## Dependency Injection

直接看這篇比較快

[](https://ithelp.ithome.com.tw/articles/10211847)

## Module

![截圖 2022-08-03 11.21.36.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3034b4ba-7e43-496f-84b0-3b73f489f6fd/%E6%88%AA%E5%9C%96_2022-08-03_11.21.36.png)

### 利用指令建立 module

```jsx
nest generate module user
```

在建立完 Module 後會發現 `@Module` 裝飾器裡面只有一個空物件，這是因為 NestCLI 不確定使用者建立該模組的用途為何

```jsx
import { Module } from '@nestjs/common';

@Module({})
export class UserModule {}
```

所以留空給使用者自行填入。那具體有哪些參數可以使用呢？共有以下四大項目：

1. `imports`：將其他模組的 Provider 匯入
2. `controllers`：將要歸納在該 Module 下的 Controller 放在這裡，會在載入該 Module 時實例化它們。
3. `providers`：將會使用到的 Provider 放在這裡，比如說：Service。會在載入該 Module 時實例化它們。
4. `exports`：在這個 Module 下的部分 Provider 可能會在其他 Module 中使用，此時就可以把這些 Provider 放在這裡進行匯出。

```tsx

// 這裡是 userModule

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository, ...userProviders],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'user/signUp',
          method: RequestMethod.POST,
        },
        {
          path: 'user/signIn',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('user');
  }
}
```

我在 UserModule 裡面把所有跟 user 這個功能相關的組件通通都記下來，這樣就可以把他們都串起來了！

## Router

```tsx
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AutoPuncherModule } from './auto_puncher/auto_puncher.module';
// import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutoPuncherModule,
    CatsModule,
    DatabaseModule,
    UserModule,
    // RouterModule.register([
    //   {
    //     path: 'user',
    //     module: UserModule,
    //   },
    // ]),
  ],
})
export class AppModule {}
```

今天我是因為專案的 controller 都只有一兩隻，所以我在分 route 的時候用 controller 就夠了

但如果今天你是在開發大規模的專案，那就建議用 `router` 來分 route 

具體上要怎麼弄呢？要在你的 `AppModule` 裡面設定，詳見我註解掉的地方！

## CORS

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
```

<aside>
💡 Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.

</aside>

## Swagger

```tsx
npm install --save @nestjs/swagger
```

首先安裝 Swagger

```tsx
// 這是 main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Auto-Puncher')
    .setDescription('Auto-Puncher API')
    .setVersion('1.0')
    .addTag('Auto-Puncher')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
```

照著官網，把 `DocumentBuilder` `SwaggerModule` 都設定好

# eslint 排版問題

安裝 `prettier eslint` 到 VScode

`shift` + `command` + `p` → 輸入 `format document...`

選擇 `prettier eslint` 

# Side-Project：Auto Puncher

[https://github.com/Lanznx/auto_puncher_V2](https://github.com/Lanznx/auto_puncher_V2)

# 延伸閱讀

### 官方文件

非常推薦到去讀他們寫的文件！非常完整詳細

[Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/)

### Design Pattern 補充包

[Service & Repository](http://kejyun.github.io/Laravel-5-Learning-Notes-Books/structure/structure-service-repository-structure-principle.html)

### request 變數驗證

[How to Use Data Transfer Objects (DTO) for Validation in NestJS](https://betterprogramming.pub/how-to-use-data-transfer-objects-dto-for-validation-in-nest-js-7ff95309f650)
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
    if (!result) {
      throw new CustomException(1032);
    }

    next();
  }
}

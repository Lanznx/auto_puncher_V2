import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AutoPuncherService } from 'src/auto_puncher/auto_puncher.service';
import { CustomException } from 'src/exception/custom.exception';

@Injectable()
export class CheckSheetMiddleware implements NestMiddleware {
  constructor(private readonly autoPuncherService: AutoPuncherService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const result = await this.autoPuncherService.checkCredential(
      req.body.credential,
      req.body.sheetKey,
    );
    if (result['code'] === 1021) {
      throw new CustomException(1021);
    } else if (result['code'] === 1020) {
      throw new CustomException(1020);
    } else if (!result.success) {
      throw new Error();
    }

    next();
  }
}

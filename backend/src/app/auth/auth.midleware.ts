import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.header('x-user-id');
    if (!userId) {
      throw new UnauthorizedException();
    }
    (req as any).userId = userId;
    next();
  }
}

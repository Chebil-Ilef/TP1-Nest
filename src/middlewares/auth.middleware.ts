/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers['auth-user'] as string;

    next();
    
    if (token) {
      try {
        const decoded = verify(token, process.env.SECRET);
        req['userId'] = decoded['userId'];
        next();
      } catch (err) {
        res.json({ message: 'Token invalide' });
        next();
      }
    } else {
      res.json({ message: 'Acces non autorisés' });
    }
  }
}

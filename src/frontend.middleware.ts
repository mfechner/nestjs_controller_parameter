import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {
    console.log("baseUrl: ", req.baseUrl);
    console.log("found lang: ", req.lng);

    if (req.lng && !req.baseUrl && req.lng === 'de-DE') {
      console.log('send german index');
      res.sendFile(join(__dirname, 'public', 'de', 'index.html'));
    } else if (!req.baseUrl) {
      console.log('send english index');
      res.sendFile(join(__dirname, 'public', 'en', 'index.html'));
    } else {
      console.log('do nothing');
    }
    next();
  }
}
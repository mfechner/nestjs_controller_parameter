import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller(':language/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Param('language') language): string {
    console.log('Called with language: ' + language);
    return this.appService.getHello();
  }
}

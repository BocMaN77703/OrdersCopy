import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getAllProducts')
  getAllProducts() {
    const res = this.appService.getAllProducts()
    return res  
  }
}

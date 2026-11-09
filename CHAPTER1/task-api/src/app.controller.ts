import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { Task } from './types/task.js';
import { TasksService } from './tasks/tasks.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): string{
    return "OK";
  }

}

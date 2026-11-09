import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import type { Task } from '../types/task.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }
    
    @Get()
    findAll(): Task[]{
        return this.tasksService.findAll();
    }

    @Get('count')
    count(): number{
        return this.tasksService.count();
    }

    @Get('completed')
    findCompleted(): Task[]{
        return this.tasksService.findCompleted();
    }

    @Get(':id')
    findOne(
        @Param('id',ParseIntPipe) id:number
    ): Task{
        const task = this.tasksService.findOne(id);

        if (!task) {
            throw new NotFoundException(
                `Task ${id} not found`,
            );
        }
        return task;
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Task{
        return this.tasksService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto
    ): Task{
        const task = this.tasksService.update(id, dto);
        if (!task) {
            throw new NotFoundException(
                `Task ${id} not found!`,
            );
        }
        return task;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseIntPipe) id: number,
    ): void {
        const deleted = this.tasksService.remove(id);
        if (!deleted) {
            throw new NotFoundException(
                `task ${id} not found!`
            );
        }
    }

}

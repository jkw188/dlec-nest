import { Injectable } from '@nestjs/common';
import type { Task } from '../types/task.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
    private readonly tasks: Task[] = [
      { id: 1, title: 'Learn NestJS', completed: false },
      { id: 2, title: 'Build Task API', completed: true, description:'build with NestJS' },
      { id: 3, title: 'Practice TypeScript', completed: false },
      
    ];

    private nextID = Math.max(0, ...this.tasks.map(({ id }) => id)) + 1;

    findAll(): Task[]{
        return this.tasks;
    }

    count(): number{
        return this.tasks.length;
    }

    findOne(id:number): Task | undefined{
        return this.tasks.find((task) => task.id === id);
    }

    findCompleted(): Task[]{
        return this.tasks.filter(({ completed }) => completed);
    }

    create(dto: CreateTaskDto): Task{
        const newTask: Task = {
            id: this.nextID++,
            title: dto.title,
            completed: dto.completed,
        }
        this.tasks.push(newTask);
        return newTask;
    }

    update(id: number, dto: UpdateTaskDto): Task|undefined{
        const task = this.findOne(id);

        if (!task) {
            return undefined;
        }
        Object.assign(task, dto);
        return task;
    }

    remove(id: number): boolean{
        const index = this.tasks.findIndex(({ id: taskID }) => taskID === id);
        if (index === -1) {
            return false;
        }
        this.tasks.splice(index, 1);
        return true;
    }

}

import {
    beforeEach,
    describe,
    expect,
    it,
}
from 'vitest';

import { TasksService } from './tasks.service.js';

describe('TasksService', () => {
    let service: TasksService;
    beforeEach(() => {
        service = new TasksService();
    });
    it('should find task by id', () => {
        const task = service.findOne(1);
        expect(task).toBeDefined();
        expect(task?.id).toBe(1);
        expect(task?.title).toBe('Learn NestJS');
    });
    it('should return undefined for unknown id', () => {
        const task = service.findOne(9999);
        expect(task).toBeUndefined();
    });
    it('should create a task', () => {
        const initialCount = service.count();
        const task = service.create({
            title: 'Write unit test',
            completed: false,
        });
        expect(task.title).toBe('Write unit tests');
        expect(task.completed).toBe(false);
        expect(service.count()).toBe(initialCount + 1);
        expect(service.findOne(task.id)).toEqual(task);
    });
    it('should update a task', () => {
        const task = service.update(1, {
            completed: true,
        });
        expect(task?.completed).toBe(true);
        expect(task?.title).toBe('Learn NestJS');
    });
    it('should delete a task', () => {
        const deleted = service.remove(1);
        expect(deleted).toBe(true);
        expect(service.findOne(1)).toBeUndefined();
    });
})
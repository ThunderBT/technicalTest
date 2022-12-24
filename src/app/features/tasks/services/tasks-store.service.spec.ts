import { TasksApiService } from 'src/app/tasks-api/services/tasks-api.service';
import { TestBed } from '@angular/core/testing';

import { TasksStoreService } from './tasks-store.service';
import { tasksMock } from './tasks-mock';
import { Task } from 'src/app/tasks-api/interfaces/task.interface';

const tasksApiServiceMock: TasksApiService = {} as TasksApiService;

describe('TasksStoreService', () => {
  let service: TasksStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TasksApiService, useValue: tasksApiServiceMock },
        TasksStoreService,
      ]
    });
    service = TestBed.inject(TasksStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('filterByCategory', () => {
    let tasks: Task[] = [];

    beforeEach(() => {
      tasks = tasksMock;
    });

    it('should return []', () => {
      const res = service.filterByCategory([], '');
      expect(res).toEqual([]);
    });

    it('should return [] with house filter', () => {
      const res = service.filterByCategory([tasks[1]], 'house');
      expect(res).toEqual([]);
    });

    it('should return [] with bureaucracy filter', () => {
      const res = service.filterByCategory([tasks[0]], 'bureaucracy');
      expect(res).toEqual([]);
    });

    it('should return house', () => {
      const res = service.filterByCategory(tasks, 'house');
      expect(res).toEqual([tasks[0]]);
    });

    it('should return bureaucracy', () => {
      const res = service.filterByCategory(tasks, 'bureaucracy');
      expect(res).toEqual([tasks[1]]);
    });

    it('should return all', () => {
      const res = service.filterByCategory(tasks, '');
      expect(res).toEqual(tasks);
    });

    it('should return null', () => {
      const res = service.filterByCategory(null, '');
      expect(res).toEqual(null);
    });

    it('should return undefined', () => {
      const res = service.filterByCategory(undefined, '');
      expect(res).toEqual(undefined);
    });
  });

  describe('filterByDone', () => {
    let tasks: Task[] = [];

    beforeEach(() => {
      tasks = tasksMock;
    });

    it('should return []', () => {
      const res = service.filterByDone([], false);
      expect(res).toEqual([]);
    });

    it('should return [] with done', () => {
      const res = service.filterByDone([tasks[0]], true);
      expect(res).toEqual([]);
    });

    it('should return [] without done', () => {
      const res = service.filterByDone([tasks[1]], false);
      expect(res).toEqual([]);
    });

    it('should return done', () => {
      const res = service.filterByDone(tasks, true);
      expect(res).toEqual([tasks[1]]);
    });

    it('should return undone', () => {
      const res = service.filterByDone(tasks, false);
      expect(res).toEqual([tasks[0]]);
    });

    it('should return null', () => {
      const res = service.filterByDone(null, false);
      expect(res).toEqual(null);
    });

    it('should return undefined', () => {
      const res = service.filterByDone(undefined, false);
      expect(res).toEqual(undefined);
    });
  });

  describe('filtrateTasks', () => {
    let tasks: Task[] = [];

    beforeEach(() => {
      tasks = tasksMock;
    });

    it('should return []', () => {
      const res = service.filtrateTasks([], '', false);
      expect(res).toEqual([]);
    });

    it('should return category filtered tasks', () => {
      spyOn(service, 'filterByCategory').and.returnValue([tasks[0]]);
      const res = service.filtrateTasks([], 'house', false);
      expect(res).toEqual([tasks[0]]);
    });

    it('should return done filtered tasks', () => {
      spyOn(service, 'filterByDone').and.returnValue([tasks[0]]);
      const res = service.filtrateTasks([], '', true);
      expect(res).toEqual([tasks[0]]);
    });

    it('should return null', () => {
      const res = service.filtrateTasks(null, '', false);
      expect(res).toEqual(null);
    });

    it('should return undefined', () => {
      const res = service.filtrateTasks(undefined, '', false);
      expect(res).toEqual(undefined);
    });
  });
});

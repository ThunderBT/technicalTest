import { Task } from '../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TasksApiService {
  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.API_URL}/tasks`);
  }

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.API_URL}/tasks/${id}`);
  }

  public createTask(data: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.API_URL}/tasks`, data);
  }

  public updateTask(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${environment.API_URL}/tasks/${id}`, data);
  }

  public deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${environment.API_URL}/tasks/${id}`);
  }
}

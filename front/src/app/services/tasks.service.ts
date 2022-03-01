import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiTaskData, Task, TaskData } from '../models/task.model';
import { ApiUserData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  fetchTasks() {
    return this.http.get<ApiTaskData[]>(environment.apiUrl + '/tasks').pipe(
      map(response => {
        return response.map(task => {
          if (task.user === null) {
            return new Task(task._id, {username: ''}, task.title, task.status);
          }
          return new Task(task._id, {username: task.user.username}, task.title, task.status);
        });
      })
    );
  }

  createTask(task: TaskData) {
    return this.http.post(environment.apiUrl + '/tasks', task);
  }

  fetchUsers() {
    return this.http.get<ApiUserData[]>(environment.apiUrl + '/users').pipe(
      map(response => {
        return response.map(user => {
          return new User(user._id, user.username);
        });
      })
    );
  }
}

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
            return new Task(task._id, {username: '', id: ''}, task.title, task.status);
          }
          return new Task(task._id, {username: task.user.username, id: task.user._id}, task.title, task.status);
        });
      })
    );
  }

  createTask(task: TaskData) {
    return this.http.post(environment.apiUrl + '/tasks', task);
  }

  editTask(data: { [key: string]: string | null }, taskId: string) {
    let taskData;
    if (data['user'] === '') {
      taskData = {user: null};
    } else if (data['user']) {
      taskData = {user: data['user']};
    } else {
      taskData = {status: data['status']};
    }
    return this.http.put(environment.apiUrl + '/tasks/' + taskId, taskData);
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

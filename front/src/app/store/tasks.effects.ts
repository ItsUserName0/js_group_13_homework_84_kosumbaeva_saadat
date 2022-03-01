import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import {
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from './tasks.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  fetchTasks = createEffect(() => this.actions.pipe(
    ofType(fetchTasksRequest),
    mergeMap(() => this.tasksService.fetchTasks().pipe(
      map(tasks => fetchTasksSuccess({tasks})),
      catchError(() => of(fetchTasksFailure({error: 'Something wrong happens while getting list of tasks!'}))),
    )),
  ));

  fetchUsers = createEffect(() => this.actions.pipe(
    ofType(fetchUsersRequest),
    mergeMap(() => this.tasksService.fetchUsers().pipe(
      map(users => fetchUsersSuccess({users})),
      catchError(() => of(fetchUsersFailure({error: 'Something wrong happens while getting list of users!'}))),
    )),
  ));

  constructor(private actions: Actions, private tasksService: TasksService) {
  }
}

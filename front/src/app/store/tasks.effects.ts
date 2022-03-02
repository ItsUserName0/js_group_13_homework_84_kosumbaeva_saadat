import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import {
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  editTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  removeTaskFailure,
  removeTaskRequest,
  removeTaskSuccess
} from './tasks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';

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

  createTask = createEffect(() => this.actions.pipe(
    ofType(createTaskRequest),
    mergeMap(({taskData}) => this.tasksService.createTask(taskData).pipe(
      map(() => createTaskSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createTaskFailure({error: 'Something wrong happens while creating the task!'}))),
    )),
  ));

  editTask = createEffect(() => this.actions.pipe(
    ofType(editTaskRequest),
    mergeMap(({data, id}) => this.tasksService.editTask(data, id).pipe(
      map(() => editTaskSuccess()),
      tap(() => this.store.dispatch(fetchTasksRequest())),
      catchError(() => of(editTaskFailure({error: 'Something wrong happens while editing the task!'}))),
    )),
  ))

  removeTask = createEffect(() => this.actions.pipe(
    ofType(removeTaskRequest),
    mergeMap(({id}) => this.tasksService.removeTask(id).pipe(
      map(() => removeTaskSuccess()),
      tap(() => this.store.dispatch(fetchTasksRequest())),
      catchError(() => of(removeTaskFailure({error: 'Something wrong happens while deleting the task!'}))),
    )),
  ));

  constructor(private actions: Actions, private tasksService: TasksService, private router: Router, private store: Store<AppState>) {
  }
}

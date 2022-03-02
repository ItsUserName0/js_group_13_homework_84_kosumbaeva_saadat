import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { editTaskRequest, removeTaskRequest } from '../../store/tasks.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() users!: User[];
  editLoading: Observable<boolean>;
  editError: Observable<null | string>;
  removeLoading: Observable<boolean>;
  removeError: Observable<null | string>;
  toBeDeletedTaskId = '';
  toBeEditedTaskId = '';
  currentAction = '';

  constructor(private store: Store<AppState>) {
    this.editLoading = this.store.select(state => state.tasks.editLoading);
    this.editError = this.store.select(state => state.tasks.editError);
    this.removeLoading = this.store.select(state => state.tasks.removeLoading);
    this.removeError = this.store.select(state => state.tasks.removeError);
  }

  ngOnInit(): void {
  }

  onChangeSettings(id: string,action: string, data: {[key: string]: string}) {
    this.toBeEditedTaskId = id;
    this.currentAction = action;
    return data;
  }

  onUserChange(userId: string) {
    const data = this.onChangeSettings(this.task.id, 'user', {user: userId});
    this.store.dispatch(editTaskRequest({data, id: this.task.id}));
  }

  onStatusChange(status: string) {
    const data = this.onChangeSettings(this.task.id, 'status', {status});
    this.store.dispatch(editTaskRequest({data, id: this.task.id}));
  }

  removeTask() {
    this.toBeDeletedTaskId = this.task.id;
    this.store.dispatch(removeTaskRequest({id: this.task.id}));
  }

}

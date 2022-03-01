import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { AppState } from '../../store/types';
import { fetchTasksRequest, fetchUsersRequest } from '../../store/tasks.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  tasks: Observable<Task[]>;
  loading: Observable<boolean>
  error: Observable<null | string>;
  users: Observable<User[]>;
  usersChangeSubscription!: Subscription;
  usersList!: User[];

  constructor(private store: Store<AppState>) {
    this.tasks = this.store.select(state => state.tasks.tasks);
    this.loading = this.store.select(state => state.tasks.fetchTasksLoading);
    this.error = this.store.select(state => state.tasks.fetchTasksError);
    this.users = this.store.select(state => state.tasks.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTasksRequest());
    this.store.dispatch(fetchUsersRequest());
    this.usersChangeSubscription = this.users.subscribe(users => {
      this.usersList = users;
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { AppState } from '../../store/types';
import { fetchUsersRequest } from '../../store/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  users: Observable<User[]>;

  constructor(private store: Store<AppState>) {
    this.users = this.store.select(state => state.tasks.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsersRequest());
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { AppState } from '../../store/types';
import { fetchTasksRequest } from '../../store/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  tasks: Observable<Task[]>;
  loading: Observable<boolean>
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.tasks = this.store.select(state => state.tasks.tasks);
    this.loading = this.store.select(state => state.tasks.fetchTasksLoading);
    this.error = this.store.select(state => state.tasks.fetchTasksError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTasksRequest());
  }

}

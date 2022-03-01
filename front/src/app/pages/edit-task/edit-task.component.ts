import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskData } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { fetchUsersRequest } from '../../store/tasks.actions';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent implements OnInit {
  @ViewChild('f') taskForm!: NgForm;
  users: Observable<User[]>;

  constructor(private tasksService: TasksService, private router: Router, private store: Store<AppState>) {
    this.users = this.store.select(state => state.tasks.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsersRequest());
  }

  onSubmit() {
    const taskData: TaskData = this.taskForm.value;
    this.tasksService.createTask(taskData).subscribe(() => {
      void this.router.navigate(['/']);
    });
  }
}

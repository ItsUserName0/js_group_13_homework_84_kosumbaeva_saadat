import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() users!: User[];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
  }

  onUserChange(userId: string) {
    const userData = {
      user: userId,
    };
    this.tasksService.editTask(userData, this.task.id).subscribe(() => {
      this.tasksService.fetchTasks();
    });
  }

  onStatusChange(status: string) {
    const statusData = {
      status,
    };
    this.tasksService.editTask(statusData, this.task.id).subscribe(() => {
      this.tasksService.fetchTasks();
    });
  }
}

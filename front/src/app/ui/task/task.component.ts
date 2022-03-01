import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() users!: User[];

  constructor() {
  }

  ngOnInit(): void {
  }

}

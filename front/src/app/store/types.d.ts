import { Task } from '../models/task.model';
import { User } from '../models/user.model';

export type TasksState = {
  tasks: Task[],
  fetchTasksLoading: boolean,
  fetchTasksError: null | string,
  users: User[],
  fetchUsersLoading: boolean,
  fetchUsersError: null | string,
};

export type AppState = {
  tasks: TasksState,
};

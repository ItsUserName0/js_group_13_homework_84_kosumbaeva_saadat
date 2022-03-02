import { Task } from '../models/task.model';
import { User } from '../models/user.model';

export type TasksState = {
  tasks: Task[],
  fetchTasksLoading: boolean,
  fetchTasksError: null | string,
  users: User[],
  fetchUsersLoading: boolean,
  fetchUsersError: null | string,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean,
  removeError: null | string,
  editLoading: boolean,
  editError: null | string,
};

export type AppState = {
  tasks: TasksState,
};

import { createAction, props } from '@ngrx/store';
import { Task, TaskData } from '../models/task.model';
import { User } from '../models/user.model';

export const fetchTasksRequest = createAction('[Tasks] Fetch Tasks');
export const fetchTasksSuccess = createAction('[Tasks] Fetch Tasks Success', props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction('[Tasks] Fetch Tasks Failure', props<{ error: string }>());

export const fetchUsersRequest = createAction('[Tasks] Fetch Users');
export const fetchUsersSuccess = createAction('[Tasks] Fetch Users Success', props<{ users: User[] }>());
export const fetchUsersFailure = createAction('[Tasks] Fetch Users Failure', props<{ error: string }>());

export const createTaskRequest = createAction('[Tasks] Create Request', props<{taskData: TaskData}>());
export const createTaskSuccess = createAction('[Tasks] Create Success');
export const createTaskFailure = createAction('[Tasks] Create Failure', props<{error: string}>());

export const removeTaskRequest = createAction('[Tasks] Remove Request', props<{ id: string }>());
export const removeTaskSuccess = createAction('[Tasks] Remove Success');
export const removeTaskFailure = createAction('[Tasks] Remove Failure', props<{ error: string }>());

export const editTaskRequest = createAction('[Tasks] Edit Request', props<{ data: { [key: string]: string | null }, id: string }>());
export const editTaskSuccess = createAction('[Tasks] Edit Success');
export const editTaskFailure = createAction('[Tasks] Edit Failure', props<{ error: string }>());

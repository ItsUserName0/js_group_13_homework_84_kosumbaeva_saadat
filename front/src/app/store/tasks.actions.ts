import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

export const fetchTasksRequest = createAction('[Tasks] Fetch Tasks');
export const fetchTasksSuccess = createAction('[Tasks] Fetch Tasks Success', props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction('[Tasks] Fetch Tasks Failure', props<{ error: string }>());

export const fetchUsersRequest = createAction('[Tasks] Fetch Users');
export const fetchUsersSuccess = createAction('[Tasks] Fetch Users Success', props<{ users: User[] }>());
export const fetchUsersFailure = createAction('[Tasks] Fetch Users Failure', props<{ error: string }>());

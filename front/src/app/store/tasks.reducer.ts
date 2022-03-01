import { TasksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from './tasks.actions';

const initialState: TasksState = {
  tasks: [],
  fetchTasksLoading: false,
  fetchTasksError: null,
  users: [],
  fetchUsersLoading: false,
  fetchUsersError: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasksRequest, state => ({...state, fetchTaskLoading: true})),
  on(fetchTasksSuccess, (state, {tasks}) => {
    return {...state, fetchTaskLoading: false, tasks};
  }),
  on(fetchTasksFailure, (state, {error}) => {
    return {...state, fetchTaskLoading: false, fetchTaskError: error};
  }),
  on(fetchUsersRequest, state => ({...state, fetchUsersLoading: true})),
  on(fetchUsersSuccess, (state, {users}) => {
    return {...state, fetchUsersLoading: false, users};
  }),
  on(fetchUsersFailure, (state, {error}) => {
    return {...state, fetchUsersLoading: false, fetchUsersError: error};
  }),
)

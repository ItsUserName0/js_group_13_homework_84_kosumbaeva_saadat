import { TasksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  editTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  removeTaskFailure,
  removeTaskRequest,
  removeTaskSuccess
} from './tasks.actions';

const initialState: TasksState = {
  tasks: [],
  fetchTasksLoading: false,
  fetchTasksError: null,
  users: [],
  fetchUsersLoading: false,
  fetchUsersError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
  editLoading: false,
  editError: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasksRequest, state => ({...state, fetchTasksLoading: true})),
  on(fetchTasksSuccess, (state, {tasks}) => ({...state, fetchTasksLoading: false, tasks})),
  on(fetchTasksFailure, (state, {error}) => ({...state, fetchTasksLoading: false, fetchTaskError: error})),
  on(fetchUsersRequest, state => ({...state, fetchUsersLoading: true})),
  on(fetchUsersSuccess, (state, {users}) => ({...state, fetchUsersLoading: false, users})),
  on(fetchUsersFailure, (state, {error}) => ({...state, fetchUsersLoading: false, fetchUsersError: error})),
  on(createTaskRequest, (state) => ({...state, createLoading: true})),
  on(createTaskSuccess, (state) => ({...state, createLoading: false})),
  on(createTaskFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(removeTaskRequest, state => ({...state, removeLoading: true})),
  on(removeTaskSuccess, state => ({...state, removeLoading: false})),
  on(removeTaskFailure, (state, {error}) => ({...state, removeLoading: false, removeError: error})),
  on(editTaskRequest, state => ({...state, editLoading: true})),
  on(editTaskSuccess, state => ({...state, editLoading: false})),
  on(editTaskFailure, (state, {error}) => ({...state, editLoading: false, editError: error})),
)

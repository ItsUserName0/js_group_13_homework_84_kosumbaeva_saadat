export class Task {
  constructor(public id: string, public user: { username: string, id: string }, public title: string, public status: string) {
  }
}

export interface ApiTaskData {
  _id: string,
  user: { username: string, _id: string },
  title: string,
  status: string,
}

export interface TaskData {
  title: string,
  user: string,
}

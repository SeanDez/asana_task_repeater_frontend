import { ITask } from './ITask';

export interface IProjectWithSortedTasks {
  gid: string;
  name: string;
  tasks: ITask[];
}

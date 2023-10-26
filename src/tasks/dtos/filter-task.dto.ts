import { TaskStatus } from '../interfaces/tasks.interface';

export class FilterTasksDTO {
  status: TaskStatus;
  search: string;
}

import { Injectable } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { TaskStatus, Tasks } from './tasks.interface';
import { CreateTaskDTO } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getTasks = () => {
    return this.tasks;
  };

  createTask = (createTaskDTO: CreateTaskDTO) => {
    const { title, description } = createTaskDTO;

    const newTask: Tasks = {
      id: uuidv1(),
      description,
      title,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return this.tasks;
  };
}

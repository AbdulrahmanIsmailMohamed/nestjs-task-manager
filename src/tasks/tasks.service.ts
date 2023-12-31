import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import { TaskStatus, Tasks } from './interfaces';
import { CreateTaskDTO, FilterTasksDTO } from './dtos';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  createTask(createTaskDTO: CreateTaskDTO): Tasks[] {
    const { title, description } = createTaskDTO;

    const newTask: Tasks = {
      id: uuidv1(),
      description,
      title,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return this.tasks;
  }

  updateTask(id: string, status: TaskStatus): Tasks {
    const task = this.getTask(id);

    if (task) {
      task.status = status;
    } else {
      throw new NotFoundException(`not found task for this id "${id}"`);
    }

    return task;
  }

  getTasks(): Tasks[] {
    return this.tasks;
  }

  getTasksWithFilter(filterTasksDTO: FilterTasksDTO): Tasks[] {
    const { status, search } = filterTasksDTO;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) => task.title === search || task.description === search,
      );
    }
    return tasks;
  }

  getTask(id: string): Tasks {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`not found task for this id "${id}"`);
    }
    return task;
  }

  deleteTask(id: string): string {
    const task = this.tasks.findIndex((task) => task.id === id);
    if (task) {
      throw new NotFoundException(`not found task for this id "${id}"`);
    }
    return 'Done';
  }
}

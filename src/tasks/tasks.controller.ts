import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.interface';
import { CreateTaskDTO } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getTasks(): Tasks[] {
    return this.tasksServices.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksServices.createTask(createTaskDTO);
  }
}

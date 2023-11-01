import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus, Tasks } from './interfaces/tasks.interface';
import { TaskValidationPipe } from './pipes';
import { CreateTaskDTO, FilterTasksDTO } from './dtos';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksServices.createTask(createTaskDTO);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskValidationPipe) status: TaskStatus,
  ): Tasks {
    return this.tasksServices.updateTask(id, status);
  }

  @Get()
  getTasks(@Query() filterTasksDTO: FilterTasksDTO): Tasks[] {
    if (filterTasksDTO) {
      this.tasksServices.getTasksWithFilter(filterTasksDTO);
    } else {
      return this.tasksServices.getTasks();
    }
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Tasks {
    return this.tasksServices.getTask(id);
  }
}

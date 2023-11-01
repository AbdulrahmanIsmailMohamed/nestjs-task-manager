import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../interfaces';

export class TaskValidationPipe implements PipeTransform {
  readonly allowedStatues = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `this value "${value}" not exist in Task Status`,
      );
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatues.indexOf(status);
    return idx !== -1;
  }
}

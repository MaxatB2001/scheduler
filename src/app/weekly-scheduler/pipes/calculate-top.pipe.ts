import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Task } from 'src/app/models/Task.model';

@Pipe({
  name: 'calculateTop',
  pure: true
})
export class CalculateTopPipe implements PipeTransform {

  transform(task: Task, ...args: unknown[]): string {  
    return moment(task.date).hours() * 60 + moment(task.date).minutes() + "px"
  }

}

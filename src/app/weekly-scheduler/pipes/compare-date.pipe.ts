import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Task } from 'src/app/models/Task.model';

@Pipe({
  name: 'compareDate',
  pure: true
})
export class CompareDatePipe implements PipeTransform {

  transform(task: Task, day: any): boolean {
    return moment(task.date).date() == day.date()  && moment(task.date).month() == day.month() + 1 && moment(task.date).year() == day.year();
  }

}

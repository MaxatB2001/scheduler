import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/Task.model';
import * as moment from 'moment';

@Pipe({
  name: 'compareDate',
  pure: true
})
export class CompareDatePipe implements PipeTransform {

  transform(task: Task, day: any): boolean {
    // console.log(moment(task.date).format("MMMM") + "  task");
    // console.log(day.month());
    // console.log(moment(task.date).month() + 1 == day.month());
    // console.log(moment(task.date).month());
    // console.log(day)
    return moment(task.date).date() == day.date()  && moment(task.date).month() == day.month() + 1;
  }

}

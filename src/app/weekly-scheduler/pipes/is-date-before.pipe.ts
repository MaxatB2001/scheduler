import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'isDateBefore',
  pure: true
})
export class IsDateBeforePipe implements PipeTransform {

  transform(hour1: number, minutes1: any, hour2: any, minutes2: any): unknown {
    const endTime = moment({
      h: hour1,
      minutes: minutes1
    });
       const beginningTime = moment({
      h: hour2,
      minutes: minutes2
    });
    console.log(endTime.isBefore(beginningTime));
    
    return endTime.isBefore(beginningTime)
  }

}

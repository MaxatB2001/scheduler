import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatHours',
  pure: true
})
export class FormatHoursPipe implements PipeTransform {

  transform(hours: number): unknown {
    return moment.utc(hours*3600*1000).format('HH:mm')
  }

}

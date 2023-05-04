import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDateAfter',
  pure: true
})
export class IsDateAfterPipe implements PipeTransform {

  transform(value: any) {
    return value
  }

}

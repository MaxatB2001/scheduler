import { Injectable } from '@angular/core';
import * as moment from "moment";
import { mockTasks } from 'src/data/tasks';
moment.locale("ru")

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentWeek(currentDate: any) {
    let weekStart = currentDate.clone().startOf('isoWeek');
    let weekEnd = currentDate.clone().endOf('isoWeek');
  
    let days = [];
  
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days'));
      
    }
    // days.push(currentDate)
    console.log(days);
    
    return days;
  }

  getCurrentDay() {

  }

  getCurrentMonth(currentDay: moment.Moment) {
    let daysInMonth = currentDay.daysInMonth()
    const arrDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      let current = moment().date(i).month(currentDay.month())
      arrDays.push(current)
    }
    return arrDays
  }
}

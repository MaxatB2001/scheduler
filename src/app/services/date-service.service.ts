import { Injectable } from '@angular/core';
import * as moment from "moment";
import { mockTasks } from 'src/data/tasks';
moment.locale("ru")

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentWeek() {
    let currentDate = moment();
  
    let weekStart = currentDate.clone().startOf('isoWeek');
    let weekEnd = currentDate.clone().endOf('isoWeek');
  
    let days = [];
  
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days'));
    }
    mockTasks.forEach(task => {
      console.log(moment(task.date).format("hh:mm"));
      
    })
    return days;
  }

  getTimePercent(time: any) {
    
  }
}

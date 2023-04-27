import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateService } from './services/date-service.service';
import { Task } from './models/Task.model';
import { mockTasks } from 'src/data/tasks';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  days: any[] = [];
  hours: number[] = [];
  timeslotCount: number[] = [1, 2];
  tasks: Task[] = mockTasks;
  opened: boolean = false;
  daysMenu = ["День", "Неделя", "Месяц"]
  activeDaysMenu = "Неделя"
  currentDay: moment.Moment = moment() ;
  moment = moment

  changeOpened() {
    this.opened = !this.opened
  }

  changeActiveDay(day: string) {
    this.activeDaysMenu = day
  }

  addDay() {
    if (this.activeDaysMenu === "День") {
      this.currentDay = moment(this.currentDay).add(1, "day")
    } else if (this.activeDaysMenu === "Неделя") {
      this.currentDay = moment(this.currentDay).add(1, "week")
    } else if (this.activeDaysMenu === "Месяц") {
      this.currentDay = moment(this.currentDay).add(1, "month")
      console.log(this.currentDay);
      
    }
  }

  onTextChange(val: any) {
    console.log(val.innerHTML.innerHTML)
  }

  removeDay() {
    if (this.activeDaysMenu === "День") {
      this.currentDay = moment(this.currentDay).subtract(1, "day")
    } else if (this.activeDaysMenu === "Неделя") {
      this.currentDay = moment(this.currentDay).subtract(1, "week")
    } else if (this.activeDaysMenu === "Месяц") {
      this.currentDay = moment(this.currentDay).subtract(1, "month")
    }
  }

  setCurrentDay() {
    this.currentDay = moment()
  }
}

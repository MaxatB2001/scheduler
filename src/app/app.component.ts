import { Component, OnInit } from '@angular/core';
import { DateService } from './services/date-service.service';
import { Task } from './models/Task.model';
import { mockTasks } from 'src/data/tasks';
import * as moment from "moment"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  days: any[] = []
  hours: number[] = []
  timeslotCount: number[] = []
  tasks: Task[] = mockTasks;
  
  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.days = this.dateService.getCurrentWeek()
    this.hours = Array(11).fill(1).map((x, i) => i++)
    this.timeslotCount = Array(2).fill(1)
  }

  onClick(time: Date) {
    const full = 11 * 60
    const temp = moment(time).hours() * 60 + moment(time).minutes() - full  
    return temp / full * 100
    
  }

  compareDate(task: Task, day: any) {
    return moment(task.date).date() == day.date()
  }
}

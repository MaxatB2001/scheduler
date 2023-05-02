import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { DateService } from './services/date-service.service';
import { Task } from './models/Task.model';
import { mockTasks } from 'src/data/tasks';
import * as moment from 'moment';
import { ReportDataService } from './services/report-data.service';
import { ReportServiceService } from './services/report-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  days: any[] = [];
  hours: number[] = [];
  timeslotCount: number[] = [1, 2];
  tasks!: Task[];
  opened: boolean = false;
  daysMenu = ["День", "Неделя", "Месяц"]
  activeDaysMenu = "Неделя"
  currentDay: moment.Moment = moment() ;
  moment = moment
  taskData: Task | null = null;
  removeReport!: Function

  constructor(private reportDataService: ReportDataService, private reportService: ReportServiceService) {}
  ngAfterViewInit(): void {
    console.log("che");
    
    document.documentElement.scrollTop = document.body.scrollTop = 370;
  }
    ngOnInit(): void {
    this.reportDataService.report$.subscribe(data => this.taskData = data)
    this.reportService.getAllReports().subscribe(data => {
      this.tasks = data
      this.removeReport = (id: any) => {
        this.reportService.deleteReport(id).subscribe(response => {
          this.tasks = this.tasks.filter(task => task.id !== id)
        })
      }
    })
  }

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

  changeDate(event: any) {
    console.log(event.value)
    this.currentDay = moment(event.value)
  }
}

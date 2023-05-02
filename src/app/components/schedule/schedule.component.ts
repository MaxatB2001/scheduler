import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Task } from 'src/app/models/Task.model';
import { DateService } from 'src/app/services/date-service.service';
import { ReportDataService } from 'src/app/services/report-data.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  days: any[] = [];
  hours: number[] = [];
  showHours: number[] = []
  timeslotCount: number[] = [1, 2];
  @Input() currentDay!: moment.Moment;
  @Input() tasks!: Task[];
  @Input() opened!: boolean;
  @Output() openedChange = new EventEmitter<boolean>()
  daysMenu = ["День", "Неделя", "Месяц"]
  @Input() activeDaysMenu!: string
  updateTaskDate!: Function

  constructor(private dateService: DateService, private reportService: ReportServiceService, private reportDataService: ReportDataService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDay']) {
      if (this.activeDaysMenu == "День") {
        this.days = [this.currentDay]
      } else if (this.activeDaysMenu == "Неделя") {
        this.days = this.dateService.getCurrentWeek(this.currentDay)
      } else if (this.activeDaysMenu == "Месяц") {
        this.days = this.dateService.getCurrentMonth(this.currentDay)        
      }
      
    }
    if (changes['activeDaysMenu']) {    
      if (this.activeDaysMenu == "День") {
        this.days = [this.currentDay]
      } else if(this.activeDaysMenu == "Неделя") {
        this.days = this.dateService.getCurrentWeek(this.currentDay)
      } else if(this.activeDaysMenu == "Месяц") {
        this.days = this.dateService.getCurrentMonth(this.currentDay)
      }
    }
    
  }

  ngOnInit(): void {
    this.days = this.dateService.getCurrentWeek(this.currentDay);
    this.hours = Array(24)
      .fill(1)
      .map((x, i) => ++i);
    this.days.map(d => {
      console.log(d.format("MMMM"))
    })
    this.showHours = Array(23)
    .fill(1)
    .map((x, i) => ++i);
    this.showHours.unshift(24)

    this.updateTaskDate = (id: number, newDate: Date) => {
      const index = this.tasks.findIndex((obj => obj.id == id))
      this.tasks[index].date = newDate
    }
  }

  onClick(time: Date) {
    const full = 11 * 60;
    const temp = moment(time).hours() * 60 + moment(time).minutes() - full;
    return (temp / full) * 100;
  }


  formatHours(hours: number) {    
    return moment.utc(hours*3600*1000).format('HH:mm')
  }

  addTask($event: MouseEvent, day: any, duration: any, timeSlotIndex: any) {    
    let totalMinutes;
    totalMinutes = duration * 30 * 2 - 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    console.log(day);
    
    let date =
      timeSlotIndex == 0
        ? new Date(day.year(), day.month() + 1, day.date(), hours)
        : new Date(day.year(), day.month() + 1, day.date(), hours, minutes);
    this.reportService.createReport({
      title: 'нет заголовка',
      date,
      duration: 30,
    }).subscribe(data => this.tasks.push(data))
    const createdTask = this.tasks[this.tasks.length - 1]
    console.log(createdTask);

  }

  changeTasks() {
    this.tasks.push({
      id: 111,
      title: "new Taska",
      duration: 60,
      date: new Date(2023, 4, 17, 0)
  },)
  }

  showTaskData(task: Task) {
    this.reportDataService.setReport(task)
    this.openedChange.emit()
  } 
}

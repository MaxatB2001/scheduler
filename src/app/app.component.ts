import { Component, OnInit } from '@angular/core';
import { DateService } from './services/date-service.service';
import { Task } from './models/Task.model';
import { mockTasks } from 'src/data/tasks';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  days: any[] = [];
  hours: number[] = [];
  timeslotCount: number[] = [1, 2];
  tasks: Task[] = mockTasks;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.days = this.dateService.getCurrentWeek();
    this.hours = Array(24)
      .fill(1)
      .map((x, i) => ++i);
    this.days.map(d => {
      console.log(d.format("MMMM"))
    })
  }

  onClick(time: Date) {
    const full = 11 * 60;
    const temp = moment(time).hours() * 60 + moment(time).minutes() - full;
    return (temp / full) * 100;
  }

  compareDate(task: Task, day: any) {
    return moment(task.date).date() == day.date();
  }

  formatHours(hours: number) {
    return moment.utc(hours*3600*1000).format('HH:mm')
  }

  addTask($event: MouseEvent, day: any, duration: any, timeSlotIndex: any) {
    console.log(day);
    console.log(duration);
    
    
    let totalMinutes;
    totalMinutes = duration * 30 * 2 - 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let date =
      timeSlotIndex == 0
        ? new Date(moment().year(), moment().month() + 1, day.date(), hours)
        : new Date(moment().year(), moment().month() + 1, day.date(), hours, minutes);

    this.tasks.push({
      id: 100,
      title: 'none',
      date,
      duration: 30,
    });
    const createdTask = this.tasks[this.tasks.length - 1]
    console.log(createdTask);
    
    const startY = $event.y
    let prev;
    const move = ($event: MouseEvent) => {
      if (startY < $event.y) {
        const dist = ($event.y - startY) % 30
        if (dist == 0) {
          prev = ($event.y - startY)
          createdTask.duration +=30
        }
        
      } 
      if (startY > $event.y) {
        console.log("bol");
      }
    } 

    const up = ($event: MouseEvent) => {
      ($event.target as any).style.cursor = "default"
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up, {once: true})
  }

  changeTasks() {
    this.tasks.push({
      id: 111,
      title: "new Taska",
      duration: 60,
      date: new Date(2023, 4, 17, 0)
  },)
  }
}

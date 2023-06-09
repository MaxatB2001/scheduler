import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { DateService } from './services/date-service.service';
import { Task } from './models/Task.model';
import { mockTasks } from 'src/data/tasks';
import * as moment from 'moment';
import { ReportDataService } from './services/report-data.service';
import { ReportServiceService } from './services/report-service.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsService } from './services/settings-service.service';

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
  daysMenu = ['День', 'Неделя', 'Месяц'];
  activeDaysMenu = 'Неделя';
  currentDay: moment.Moment = moment();
  moment = moment;
  taskData: Task | null = null;
  removeReport!: Function;
  startTime!: number;
  endTime!: number;
  workStartHours!: number
  workStartMinutes!: number
  workEndMinutes!: number
  workEndHours!: number
  dinnerHour!: number
  dinnerMinutes!: number

  constructor(
    private reportDataService: ReportDataService,
    private reportService: ReportServiceService,
    public dialog: MatDialog,
    private settingsService: SettingsService
  ) {}
  ngAfterViewInit(): void {
    document.documentElement.scrollTop = document.body.scrollTop = 300;
  }
  ngOnInit(): void {
    this.settingsService.settings$.subscribe(data => {
      this.workStartHours = data.workStartHours
      this.workEndHours = data.workEndHours
      this.workStartMinutes = data.workStartMinutes
      this.workEndMinutes = data.workEndMinutes
      this.dinnerHour = data.dinnerHour
      this.dinnerMinutes = data.dinnerMinutes
    })
    this.reportDataService.report$.subscribe((data) => (this.taskData = data));
    this.reportService.getAllReports().subscribe((data) => {
      this.tasks = data;
      this.removeReport = (id: any) => {
        this.reportService.deleteReport(id).subscribe((response) => {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        });
      };
    });
  }

  changeOpened() {
    this.opened = !this.opened;
  }

  changeActiveDay(day: string) {
    this.activeDaysMenu = day;
  }

  addDay() {
    if (this.activeDaysMenu === 'День') {
      this.currentDay = moment(this.currentDay).add(1, 'day');
    } else if (this.activeDaysMenu === 'Неделя') {
      this.currentDay = moment(this.currentDay).add(1, 'week');
    } else if (this.activeDaysMenu === 'Месяц') {
      this.currentDay = moment(this.currentDay).add(1, 'month');
    }
  }

  onTextChange(val: any) {
    console.log(val.innerHTML.innerHTML);
  }

  removeDay() {
    if (this.activeDaysMenu === 'День') {
      this.currentDay = moment(this.currentDay).subtract(1, 'day');
    } else if (this.activeDaysMenu === 'Неделя') {
      this.currentDay = moment(this.currentDay).subtract(1, 'week');
    } else if (this.activeDaysMenu === 'Месяц') {
      this.currentDay = moment(this.currentDay).subtract(1, 'month');
    }
  }

  setCurrentDay() {
    this.currentDay = moment();
  }

  changeDate(event: any) {
    this.currentDay = moment(event.value);
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent);
  }
}

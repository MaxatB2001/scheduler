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
import { SettingsService } from './services/settings-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
}

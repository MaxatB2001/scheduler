import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeeklySchedulerRoutingModule } from './weekly-scheduler-routing.module';
import { WeeklySchedulerComponent } from './weekly-scheduler/weekly-scheduler.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { TaskComponent } from './components/task/task.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CompareDatePipe } from './pipes/compare-date.pipe';
import { CalculateTopPipe } from './pipes/calculate-top.pipe';
import { FormatHoursPipe } from './pipes/format-hours.pipe';
import { IsDateAfterPipe } from './pipes/is-date-after.pipe';
import { IsDateBeforePipe } from './pipes/is-date-before.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    WeeklySchedulerComponent,
    TaskComponent,
    ScheduleComponent,
    CompareDatePipe,
    CalculateTopPipe,
    SideBarComponent,
    FormatHoursPipe,
    SettingsComponent,
    IsDateAfterPipe,
    IsDateBeforePipe
  ],
  imports: [
    CommonModule,
    WeeklySchedulerRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule,
    MatNativeDateModule ,
    { provide: MAT_DATE_LOCALE, useValue: 'ru' }]
})
export class WeeklySchedulerModule { }

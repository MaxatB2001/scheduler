import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { SettingsService } from 'src/app/services/settings-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingsService: SettingsService
  ) {}
  ngOnInit(): void {
    this.settingsService.settings$.subscribe(data => {
      this.startDate = `${data.workStartHours}:${data.workStartMinutes}`
      this.endDate = `${data.workEndHours}:${data.workEndMinutes}`
      this.dinnerTime = `${data.dinnerHour}:00`
    })
  }

  startDate = '00:00';
  endDate = '00:00';
  dinnerTime = "13:00"

  startDateChanged(time: string) {
    const splitted = time.split(':');
    this.settingsService.updateWorkStartTime(Number(splitted[0]), Number(splitted[1]))
  }

  endDateChanged(time: string) {
    const splitted = time.split(':');
    this.settingsService.updateWorkEndTime(Number(splitted[0]), Number(splitted[1]))
  }

  dinnerTimeChanged(time: string) {
    const splitted = time.split(':');
    this.settingsService.updateDinnerTime(Number(splitted[0]), Number(splitted[1]))
  }
}

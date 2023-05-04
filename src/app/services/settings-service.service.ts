import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Settings {
  workStartHours: number;
  workStartMinutes: number;
  workEndHours: number;
  workEndMinutes: number;
  dinnerHour: number;
  dinnerMinutes: number
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  private settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    workStartHours: 8,
    workStartMinutes: 0,
    workEndHours: 18,
    workEndMinutes: 0,
    dinnerHour: 13,
    dinnerMinutes: 0
  });
  public settings$: Observable<Settings> = this.settings.asObservable();

  updateWorkStartTime(hours: number, minutes: number) {
    const updated: Settings = {
      ...this.settings.getValue(),
      workStartHours: hours,
      workStartMinutes: minutes,
    };
    this.settings.next(updated);
  }

  updateWorkEndTime(hours: number, minutes: number) {
    const updated: Settings = {
      ...this.settings.getValue(),
      workEndHours: hours,
      workEndMinutes: minutes,
    };
    this.settings.next(updated);
  }

  updateDinnerTime(hour: number, minutes: number) {
    const updated: Settings = {
      ...this.settings.getValue(),
      dinnerHour: hour,
      dinnerMinutes: minutes
    };
    this.settings.next(updated);
  }
}

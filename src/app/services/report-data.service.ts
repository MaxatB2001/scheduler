import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { ReportServiceService } from './report-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {

  constructor() { }

  private report: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null)
  public report$: Observable<Task | null> = this.report.asObservable()

  setReport(task: Task) {
    this.report.next(task)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }

  getAllReports(): Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:48150/api/task-manager/reports")
  }

  createReport(body: Task): Observable<Task> {
    return this.http.post<Task>("http://localhost:48150/api/task-manager/reports", body)
  }

  updateReport(id: number, body: any): Observable<any> {
    return this.http.patch(`http://localhost:48150/api/task-manager/reports/${id}`, body)
  }

  getReport(id: number): Observable<Task> {
    return this.http.get<Task>("")
  }
}

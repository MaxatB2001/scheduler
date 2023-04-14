import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockTasks } from 'src/data/tasks';
import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(mockTasks)
  public tasks$: Observable<Task[]> = this.tasks.asObservable()
}

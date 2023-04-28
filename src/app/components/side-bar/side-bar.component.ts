import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { Place } from 'src/app/enums/place.enum';
import { WorkTypes } from 'src/app/enums/work-types.enum';
import { Work } from 'src/app/enums/work.enum';
import { Task } from 'src/app/models/Task.model';
import { ReportDataService } from 'src/app/services/report-data.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private reportDataService: ReportDataService) {}
  
  ngOnInit(): void {
    this.filteredWorkType = this.myControl.valueChanges.pipe(startWith(''),
    map(value => this._filter(value || '')),)
    
    this.reportDataService.report$.subscribe(data => this.task = data)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.workTypes.filter(option => option.toLowerCase().includes(filterValue));
  }
  myControl = new FormControl('')
  task: Task | null = null;
  moment = moment
  workTypes = Object.values(WorkTypes)
  filteredWorkType = Observable<any>
  works = Object.values(Work)
  place = Object.values(Place)

  updateTaskTitle($event: any) {
    console.log($event);
    
  }
}

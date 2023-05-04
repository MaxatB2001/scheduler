import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { Place } from 'src/app/enums/place.enum';
import { WorkTypes } from 'src/app/enums/work-types.enum';
import { Work } from 'src/app/enums/work.enum';
import { Task } from 'src/app/models/Task.model';
import { ReportDataService } from 'src/app/services/report-data.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private reportDataService: ReportDataService, private reportService: ReportServiceService) {}
  
  ngOnInit(): void {
    this.filteredWorkType = this.myControl.valueChanges.pipe(startWith(''),
    map(value => this.workTypesFilter(value || '')),)
    this.filteredWorks = this.worksControl.valueChanges.pipe(startWith(''),
    map(value => this.worksFilter(value || '')),)
    this.filteredPlace = this.placeControl.valueChanges.pipe(startWith(''),
    map(value => this.placesFilter(value || '')),)
    this.reportDataService.report$.subscribe(data => {
      this.task = data
      this.placeControl.setValue(data?.place as string)
      this.myControl.setValue(data?.workType as string)
      this.worksControl.setValue(data?.work as string)
    })
  }

  private workTypesFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.workTypes.filter(option => option.toLowerCase().includes(filterValue));
  }

  private worksFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.works.filter(option => option.toLowerCase().includes(filterValue));
  }

  private placesFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.place.filter(option => option.toLowerCase().includes(filterValue));
  }

  myControl = new FormControl('')
  worksControl = new FormControl('')
  placeControl = new FormControl('')
  task: Task | null = null;
  moment = moment
  workTypes: string[] = Object.values(WorkTypes)
  filteredWorkType!: Observable<string[]>
  works: string[] = Object.values(Work)
  filteredWorks!: Observable<string[]>
  place: string[] = Object.values(Place)
  filteredPlace!: Observable<string[]>;
  @Input() removeReport!: any
  @Input() opened!: boolean;
  @Output() openedChange = new EventEmitter<boolean>()

  updateTaskTitle(title: any) {
    if (this.task) {
      this.reportService.updateReport(this.task.id as number, {title}).subscribe(data => console.log(data))
    }
  }

  updateTaskDescription(description: any) {
    if (this.task) {
      this.reportService.updateReport(this.task.id as number, {description}).subscribe(data => console.log(data))
    }
  }

  updatePlace(place: string) {
    if (this.task) {
      this.reportService.updateReport(this.task.id as number, {place}).subscribe(data => {
        this.placeControl.setValue(place)
      })
    }
  }

  updateWorkType(workType: string) {
    if (this.task) {
      this.reportService.updateReport(this.task.id as number, {workType}).subscribe(data => {
        this.myControl.setValue(workType)
      })
    }
  }

  updateWork(work: string) {
    if (this.task) {
      this.reportService.updateReport(this.task.id as number, {work}).subscribe(data => {
        this.worksControl.setValue(work)
        if (this.task) {
          this.task.work = work as Work
        }
      })
    }
  }

  
  updateReportValue(key: string, value: string | null | number) {
    const data: any = {};
    data[key] = value;
    if (this.task) {
      this.reportService
      .updateReport(this.task.id as number, data)
      .subscribe((data) => console.log(data));
    }
  }

  deleteReport() {
    if (this.task) {
      this.removeReport(this.task.id)
      this.openedChange.emit()
    }
  }
}

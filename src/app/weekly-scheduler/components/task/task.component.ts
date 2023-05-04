import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import * as moment from 'moment';
import interact from 'interactjs';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements AfterViewInit {
  @Input() task!: Task;
  @Input() day: any;
  @ViewChild('taskk')
  ref!: ElementRef;
  interactable!: any;
  currentWidth!: number;
  @Input() updateTaskDate!: Function
 
  constructor(private reportService: ReportServiceService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.ref.nativeElement.parentNode.parentNode.parentNode
        .parentNode.offsetTop + 50)
      this.interactable = interact(this.ref.nativeElement)
        .resizable({
          preserveAspectRatio: false,
          modifiers: [
            interact.modifiers.snap({
              targets: [interact.snappers.grid({ x: 30, y: 30 })],
              range: Infinity,
              relativePoints: [{ x: 0, y: 0 }],
              origin: {
                x: this.ref.nativeElement.parentNode.parentNode.parentNode
                  .parentNode.offsetLeft,
                y: this.ref.nativeElement.parentNode.parentNode.parentNode
                  .parentNode.offsetTop + 50,
              },
            }),
            interact.modifiers.restrictSize({
              min: { width: this.ref.nativeElement.offsetWidth, height: 30 },
            }),
            interact.modifiers.restrictEdges({
              outer: this.ref.nativeElement.parentNode.parentNode.parentNode,
            }),
          ],
          edges: { left: false, right: false, bottom: true, top: true },
        })
        .on('resizestart', (event) => {
          console.info('resizestart = ', event);
        })
        .on('resizemove', function (event) {
          var target = event.target,
            x = parseFloat(target.getAttribute('data-x')) || 0,
            y = parseFloat(target.getAttribute('data-y')) || 0;
          target.style.height = event.rect.height + 'px';

          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        })
        .on('resizeend', (event) => {  
          const end = Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2);
            console.log(Math.trunc((Math.round(Number(end)) / 30)));
            
          if (event.deltaRect.bottom > 0) {            
            this.task.duration += Math.trunc((Math.round(Number(end)) / 30)) * 30
            this.changeDuration(this.task.duration);
          } else if (event.deltaRect.bottom < 0) {
            this.task.duration -= Math.trunc((Math.round(Number(end)) / 30)) * 30
            this.changeDuration(this.task.duration);
          } else if (event.deltaRect.top > 0) {
            this.task.date = moment(this.task.date)
              .add(Math.floor(Number(end) / 30) * 30, 'minutes')
              .toDate();
            this.task.duration -= Math.floor(Number(end) / 30) * 30;
            this.changeDate(this.task.date);
            this.changeDuration(this.task.duration);
          } else if (event.deltaRect.top < 0) {
            console.log("top < 0");
            console.log();
            
            this.task.date = moment(this.task.date)
              .subtract(Math.trunc((Math.round(Number(end)) / 30)) * 30, 'minutes')
              .toDate();
            this.task.duration += Math.floor(Number(end) / 30) * 30;
            this.changeDate(this.task.date);
            this.changeDuration(this.task.duration);
          }
        })
        .draggable({
          listeners: {
            move: (event) => {
              var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
              target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
            },
            end: (event) => {
              let moveX = event.pageX - event.x0
              let moveY = event.pageY - event.y0
              console.log(Math.round(moveY / 30));
              
              this.task.date = moment(this.task.date).add(Math.round(moveX / this.currentWidth), "day").toDate()
              if (moveY !== 0) {
                if (moveY > 0) {
                  this.task.date = moment(this.task.date).add(Math.round(moveY / 30) * 30, "minutes").toDate()
                } else {
                  this.task.date = moment(this.task.date).subtract(-(Math.round(moveY / 30) * 30), "minutes").toDate()
                }
              }
              this.changeDate(this.task.date)
              this.updateTaskDate(this.task.id, this.task.date)
            },
          },
          modifiers: [
            interact.modifiers.snap({
              targets: [
                interact.createSnapGrid({
                  x: this.ref.nativeElement.offsetWidth,
                  y: 30,
                }),
              ],
              range: Infinity,
              relativePoints: [{ x: 0, y: 0 }],
              origin: {
                x: this.ref.nativeElement.parentNode.parentNode.parentNode
                  .parentNode.offsetLeft,
                y: this.ref.nativeElement.parentNode.parentNode.parentNode
                  .parentNode.offsetTop + 50,
              },
            }),
            interact.modifiers.restrict({
              restriction:
                this.ref.nativeElement.parentNode.parentNode.parentNode
                  .parentNode,
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
              endOnly: true,
            }),
          ],
          inertia: false,
          autoScroll: true,
        });

      const out = () => {
        this.currentWidth = this.ref.nativeElement.offsetWidth;
        this.interactable.options.drag.modifiers[0].options.targets = [
          interact.createSnapGrid({
            x: this.ref.nativeElement.offsetWidth,
            y: 30,
          }),
        ];
      };
      out();
      new ResizeObserver(out).observe(this.ref.nativeElement);
    });
  }

  calculateTop() {
    return (
      moment(this.task.date).hours() * 60 + moment(this.task.date).minutes()
    );
  }

  changeDate(date: Date) {
    if (this.task.id) {
      this.reportService
        .updateReport(this.task.id, { date })
        .subscribe((data) => console.log(data));
    }
  }

  changeDuration(duration: number) {
    if (this.task.id) {
      this.reportService
        .updateReport(this.task.id, { duration })
        .subscribe((data) => console.log(data));
    }
  }
}

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import * as moment from 'moment';
import interact from 'interactjs';
import { Interactable } from '@interactjs/types';
import { Modifier } from '@interactjs/modifiers/types';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements AfterViewInit, OnChanges {
  @Input() task!: Task;
  @Input() day: any;
  @ViewChild('taskk')
  ref!: ElementRef;
  interactable!: any
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.interactable = interact(this.ref.nativeElement)
        .resizable({
          preserveAspectRatio: false,
          modifiers: [
            interact.modifiers.snap({
              targets: [interact.snappers.grid({ x: 30, y: 30 })],
              range: Infinity,
              relativePoints: [{ x: 0, y: 0 }],
              origin: {
                x: this.ref.nativeElement.parentNode.parentNode.parentNode.parentNode.offsetLeft,
                y: this.ref.nativeElement.parentNode.parentNode.parentNode.parentNode.offsetTop
              }
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
          console.info('resizemove = ', event);
          var target = event.target,
            x = parseFloat(target.getAttribute('data-x')) || 0,
            y = parseFloat(target.getAttribute('data-y')) || 0;

          // update the element's style
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        })
        .on('resizeend', function (event) {
          console.log('end');
          console.log(event);
        })
        .draggable({
          listeners: {
            move: (event) => {
                var target = event.target,
                  // keep the dragged position in the data-x/data-y attributes
                  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                
              console.log(this.interactable.options.drag.modifiers[0].options.targets);
                  
                // translate the element
                target.style.webkitTransform = target.style.transform =
                  'translate(' + x + 'px, ' + y + 'px)';
            
                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end: (event) => {
              console.log(event);
            },
          },
          modifiers: [
            interact.modifiers.snap({
              targets: [
                // interact.snappers.grid({
                //   x: this.ref.nativeElement.offsetWidth,
                //   y: 30,
                // }),
                interact.createSnapGrid({x: this.ref.nativeElement.offsetWidth, y: 30})
              ],
              range: Infinity,
              relativePoints: [{ x: 0, y: 0 }],
              origin: {
                x: this.ref.nativeElement.parentNode.parentNode.parentNode.parentNode.offsetLeft,
                y: this.ref.nativeElement.parentNode.parentNode.parentNode.parentNode.offsetTop
              }
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
          autoScroll: true
          // autoScroll: {
          //   container: this.ref.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,
          //   margin: 50,
          //   distance: 5,
          //   interval: 10,
          //   speed: 300,
          // },
        });
    
        const out = () => {
          this.interactable.options.drag.modifiers[0].options.targets = [ interact.createSnapGrid({x: this.ref.nativeElement.offsetWidth, y: 30})]
        }
        out()
        new ResizeObserver(out).observe(this.ref.nativeElement)
      });
  }

  calculateTop() {
    return (
      moment(this.task.date).hours() * 60 + moment(this.task.date).minutes()
    );
  }
}

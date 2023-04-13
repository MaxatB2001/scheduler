import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import * as moment from 'moment';
import interact from 'interactjs';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements AfterViewInit {
  @Input() task!: Task;
  @Input() day: any;
  @ViewChild('task')
  ref!: ElementRef;

  ngAfterViewInit(): void {
    var x = 0; var y = 0
    setTimeout(() => {
      interact(this.ref.nativeElement).resizable({
        // resize from all edges and corners
        preserveAspectRatio: false,
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
        ],
        edges: { left: false, right: false, bottom: true, top: true },
      })
      .on('resizestart', function(event) {
        console.info('resizestart = ', event);
      }).on('resizemove', function(event) {
        console.info('resizemove = ', event);
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);
    
        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
    
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;
    
        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';
    
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }).on("resizeend", function(event) {
        console.log("end")
        console.log(event);
        
      }).draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
          interact.modifiers.restrict({
            // restriction: this.ref.nativeElement.parentNode,
            elementRect: { top: 0, left: 0, bottom: 0, right: 0 },
            endOnly: true
          })
        ],
        inertia: true
      }).on('dragmove', function (event) {
        // x += event.dx
        y += event.dy
    
        event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        
      })
    });
  }

  logg() {
    console.log(this.ref.nativeElement);
  }
}

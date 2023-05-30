import { Component, EventEmitter, Input, Output } from '@angular/core'
import { type Course } from 'src/app/utilus/global.moduls'
import { formatMinutesToHours } from 'src/app/helpers/formatMinutesToHours';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent {
  @Input() courseData?: Course;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();


  formatDuration(minutes: string): string {
    return formatMinutesToHours(minutes);
  }
  handleEdit(id: string): void {
    console.log(`Button "Edit" clicked on course ${id}`);
  }
  deleteClick(id: string) {
    this.deleteCourse.emit(id);
  }
}

import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { type Course } from 'src/app/utilus/global.moduls';


@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent {
  @Input() courseData?: Course;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();


  showConfirmationModal = false;

  handleEdit(id: string): void {
    console.log(`Button "Edit" clicked on course ${id}`);
  }
  showModal() {
    this.showConfirmationModal = true;
  }

  closeModal() {
    this.showConfirmationModal = false;
  }


}

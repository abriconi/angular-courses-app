import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { type Course } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent {
  @Input() courseData?: Course;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  showConfirmationModal = false;

  handleEdit(id: string): void {
    this.router.navigate(['/courses', id]);
  }

  showModal() {
    this.showConfirmationModal = true;
  }

  closeModal() {
    this.showConfirmationModal = false;
  }

}

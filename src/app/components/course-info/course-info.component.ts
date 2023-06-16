import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent {
  @Output() courseCreated = new EventEmitter<Omit<Course, 'id' | 'topRated'>>();

  ifAllFieldFill = true;

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    creationDate: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required)
  });

  constructor(private courseService: CourseService) {
  }

  updateDuration(value: string): void {
      value? console.log(value) : console.log('empty')
  }

  createCourse(event: Event): void {
    event.preventDefault();
    if (this.courseForm.invalid) {
      this.ifAllFieldFill = false;
      return;
    }

    const title = this.courseForm.value.title;
    const description = this.courseForm.value.description;
    const duration = this.courseForm.value.duration;
    const creationDate = this.courseForm.value.creationDate;
    const authors = this.courseForm.value.authors;

    const newCourse: Omit<Course, 'id' | 'topRated'> = {
      title: title !== undefined && title !== null ? title : '',
      description: description !== undefined && description !== null ? description : '',
      duration: duration !== undefined && duration !== null ? duration : '',
      creationDate: creationDate !== undefined && creationDate !== null ? creationDate : '',
      authors: authors !== undefined && authors !== null ? authors : ''
    }
    const createdCourse = this.courseService.courseCreated(newCourse);
    console.log('createdCourse', createdCourse);

    this.courseCreated.emit(createdCourse);
    this.resetForm();
  }

  cancelCreating(): void {
    console.log('Cansel button clicked');
    this.courseForm.reset();
  }

  resetForm(): void {
    this.courseForm.reset();
    this.ifAllFieldFill = true;
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})


export class CourseInfoComponent implements OnInit {
  @Output() courseCreated = new EventEmitter<Omit<Course, 'id' | 'topRated'>>();

  courseId!: string | null;
  courseData: Course | undefined;

  ifAllFieldFill = true;

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    creationDate: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required)
  });

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        const courseData = this.courseService.getItemById(this.courseId);

        if (courseData) {
          this.courseForm.patchValue({
            title: courseData.title,
            description: courseData.description,
            duration: courseData.duration,
            creationDate: courseData.creationDate,
            authors: courseData.authors
          });
        }
      }
    });
  }

  createCourse(event: Event): void {
    event.preventDefault();
    if (this.courseForm.invalid) {
      this.ifAllFieldFill = false;
      return;
    }

    const newCourse: Omit<Course, 'id' | 'topRated'> = {
      title: this.courseForm.value.title ?? '',
      description: this.courseForm.value.description ?? '',
      duration: this.courseForm.value.duration ?? '',
      creationDate: this.courseForm.value.creationDate ?? '',
      authors: this.courseForm.value.authors ?? ''
    };
    const createdCourse = this.courseService.courseCreated(newCourse);

    this.courseCreated.emit(createdCourse);
    this.resetForm();
  }

  cancelCreating(): void {
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }

  saveCourse(event: Event): void {
    event.preventDefault();
    if (this.courseId) {
      const courseToUpdate: Omit<Course, 'id' | 'topRated'> = {
        title: this.courseForm.value.title ?? '',
        description: this.courseForm.value.description ?? '',
        duration: this.courseForm.value.duration ?? '',
        creationDate: this.courseForm.value.creationDate ?? '',
        authors: this.courseForm.value.authors ?? ''
      };
      this.courseService.updateItem(this.courseId, courseToUpdate);
    } else {
      this.createCourse(event);
    }
    this.router.navigate(['/courses']);
  }

  resetForm(): void {
    this.courseForm.reset();
    this.ifAllFieldFill = true;
  }
}

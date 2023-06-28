import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { authorsMockedData } from 'src/app/utilus/global.constans';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})

export class CourseInfoComponent implements OnInit {
  @Output() courseCreated = new EventEmitter<Omit<COURSE_MODEL, 'id' | 'isTopRated'>>();

  courseId!: number | null;
  courseData: COURSE_MODEL | undefined;

  ifAllFieldFill = true;

  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    date: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required),
  });

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      if (this.courseId) {
        const courseData: COURSE_MODEL | undefined = this.courseService.getItemById(this.courseId);

        if (courseData) {
          const authorNames = courseData.authors.map(author => author.name).join(', ');
          this.courseForm.patchValue({
            name: courseData.name,
            description: courseData.description,
            length: courseData.length.toString(),
            date: courseData.date,
            authors: authorNames,
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

    const newCourse: Omit<COURSE_MODEL, 'id' | 'isTopRated'> = {
      name: this.courseForm.value.name ?? '',
      description: this.courseForm.value.description ?? '',
      length: Number(this.courseForm.value.length) ?? 0,
      date: this.courseForm.value.date ?? '',
      // authors: [this.courseForm.value.authors] ?? [],
      authors: authorsMockedData ?? [],
    };
    const createdCourse: COURSE_MODEL = this.courseService.courseCreated(newCourse);

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
      const courseToUpdate: Omit<COURSE_MODEL, 'id' | 'isTopRated'> = {
        name: this.courseForm.value.name ?? '',
        description: this.courseForm.value.description ?? '',
        length: Number(this.courseForm.value.length) ?? '',
        date: this.courseForm.value.date ?? '',
        authors: authorsMockedData
        // authors: this.courseForm.value.authors as Authors[]
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

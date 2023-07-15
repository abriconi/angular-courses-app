import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { authorsMockedData } from 'src/app/utilus/global.constans';
import { generateId, transformDate } from 'src/app/utilus/helpers';
import { formatDateToServer } from 'src/app/utilus/helpers';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { createCourse, getCourse, updateCourse } from 'src/app/store/courses/courses.actions';
import { selectCourse } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})

export class CourseInfoComponent implements OnInit, OnDestroy {
  @Output() courseCreated = new EventEmitter<Omit<COURSE_MODEL, 'id' | 'isTopRated'>>();

  courseId!: number | null;
  courseData!: COURSE_MODEL | null;
  idSubscribtion!: Subscription;

  ifAllFieldFill = true;

  courseFormInitialValue: any = null;

  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    date: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.idSubscribtion = this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      if (this.courseId) {
        this.store.dispatch(getCourse({ id: this.courseId }));
        this.store.select((selectCourse)).subscribe((course) => {
          this.courseData = course;
          if (this.courseData) {
            const authorNames = this.courseData.authors.map(author => author.name).join(', ');

            this.courseFormInitialValue = {
              name: this.courseData.name,
              description: this.courseData.description,
              length: this.courseData.length.toString(),
              date: transformDate(this.courseData.date),
              authors: authorNames,
            }

            this.courseForm.patchValue(this.courseFormInitialValue);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.idSubscribtion.unsubscribe();
  }

  getDirtyValues() {
    const dirtyValues = {} as Record<string, string>;

    Object.keys(this.courseForm.controls)
        .forEach((key) => {
            const currentControl = (this.courseForm.controls as any)[key];

            if (currentControl.value !== this.courseFormInitialValue?.[key]) {
              dirtyValues[key] = currentControl.value;
            }
        });

    return dirtyValues;
  }

  createCourse(event: Event): void {
    event.preventDefault();
    if (this.courseForm.invalid) {
      this.ifAllFieldFill = false;
      return;
    }

    if (this.courseId) {
      const updatedCourseFields = this.getDirtyValues() as Partial<COURSE_MODEL>;

      if (!Object.keys(updatedCourseFields).length) {
        return;
      }

      this.store.dispatch(updateCourse({ id: this.courseId, courseData: updatedCourseFields }));
      this.resetForm();
      this.router.navigate(['/courses']);
    } else {
      const newCourse: COURSE_MODEL = {
        id: generateId(),
        name: this.courseForm.value.name ?? '',
        description: this.courseForm.value.description ?? '',
        length: Number(this.courseForm.value.length) ?? 0,
        date: formatDateToServer(this.courseForm.value.date) ?? '',
        authors: authorsMockedData ?? [],
        isTopRated: Math.random() >= 0.5,
      }
      this.store.dispatch(createCourse({ newCourse: newCourse  }));
      this.resetForm();
      this.router.navigate(['/courses']);
    }
  }

  cancelCreating(): void {
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }

  resetForm(): void {
    this.courseForm.reset();
    this.ifAllFieldFill = true;
  }

}

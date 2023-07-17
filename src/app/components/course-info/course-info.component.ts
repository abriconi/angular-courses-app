import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { transformDate } from 'src/app/utilus/helpers';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { createCourse, getAuthors, getCourse, updateCourse } from 'src/app/store/courses/courses.actions';
import { selectAuthors, selectCourse } from 'src/app/store/courses/courses.selectors';

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
  authorsSubscription!: Subscription;
  dropdownList: { item_id: string; item_text: string }[] = [];
  dropdownSettings = {};

  ifAllFieldFill = true;
  private errorMessageEnum = {
    name: '* Please check Title field, max length 50 symbols',
    description: '* Please check Description field, max length 500 symbols',
    emptyFiels: '* Please fill all field',
  }
  errorMessage = '';

  courseFormInitialValue: any = null;

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    date: new FormControl('', Validators.required),
    authors: new FormControl([], Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false,
    };

    this.store.dispatch(getAuthors());

    this.authorsSubscription  = this.store.select((selectAuthors)).subscribe((authors) => {
      this.dropdownList = (authors || []).map(({ id, name }) => ({ item_id: id, item_text: name }));
    });

    this.idSubscribtion = this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      if (this.courseId) {
        this.store.dispatch(getCourse({ id: this.courseId }));
        this.store.select((selectCourse)).subscribe((course) => {
          this.courseData = course;
          if (this.courseData) {
            this.courseFormInitialValue = {
              name: this.courseData.name,
              description: this.courseData.description,
              length: this.courseData.length.toString(),
              date: transformDate(this.courseData.date),
              authors: this.courseData.authors.map(author => ({
                item_id: author.id.toString(),
                item_text: author.name,
              })),
            }

            this.courseForm.patchValue(this.courseFormInitialValue);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.idSubscribtion.unsubscribe();
    this.authorsSubscription.unsubscribe();
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

      if (this.courseForm.controls.name.invalid) {
        this.errorMessage = this.errorMessageEnum.name;
        return;
      } else if (this.courseForm.controls.description.invalid) {
        this.errorMessage = this.errorMessageEnum.description;
        return;
      } else {
        this.errorMessage = this.errorMessageEnum.emptyFiels;
        return;
      }
    }

    if (this.courseId) {
      const updatedCourseFields = this.getDirtyValues() as Partial<COURSE_MODEL>;

      if (!Object.keys(updatedCourseFields).length) {
        return;
      }

      if (updatedCourseFields.authors) {
        updatedCourseFields.authors = updatedCourseFields.authors.map((author: any) => ({
          id: author.item_id,
          name: author.item_text,
        }))
      }

      this.store.dispatch(updateCourse({ id: this.courseId, courseData: updatedCourseFields }));
      this.resetForm();
      this.router.navigate(['/courses']);
    } else {
      const newCourse: Omit<COURSE_MODEL, 'id'> = {
        name: this.courseForm.value.name ?? '',
        description: this.courseForm.value.description ?? '',
        length: Number(this.courseForm.value.length) ?? 0,
        date: transformDate(this.courseForm.value.date) ?? '',
        authors: this.courseForm.value.authors?.map((author: any) => ({
          id: author.item_id,
          name: author.item_text,
        })) ?? [],
      }

      this.store.dispatch(createCourse({ newCourse  }));
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

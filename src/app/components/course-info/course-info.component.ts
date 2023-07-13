import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { authorsMockedData } from 'src/app/utilus/global.constans';
import { transformDate } from 'src/app/utilus/helpers';
import { formatDateToServer } from 'src/app/utilus/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})

export class CourseInfoComponent implements OnInit, OnDestroy {
  @Output() courseCreated = new EventEmitter<Omit<COURSE_MODEL, 'id' | 'isTopRated'>>();

  courseId!: number | null;
  courseData: COURSE_MODEL | undefined;
  idSubscribtion!: Subscription;

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
    this.idSubscribtion = this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      if (this.courseId) {
        this.courseService.getItemById(this.courseId)
        this.courseService.course$.subscribe(
          (courseData: COURSE_MODEL | null) => {
            if (courseData) {
              const authorNames = courseData.authors.map(author => author.name).join(', ');
              this.courseForm.patchValue({
                name: courseData.name,
                description: courseData.description,
                length: courseData.length.toString(),
                date: transformDate(courseData.date),
                authors: authorNames,
              });
            }
          }
        )
      }
    });
  }

  // TODO is correct unsubscribe?
  ngOnDestroy(): void {
    this.idSubscribtion.unsubscribe();
  }

  createCourse(event: Event): void {
    event.preventDefault();
    if (this.courseForm.invalid) {
      this.ifAllFieldFill = false;
      return;
    }

    if(this.courseId) {
      const newCourse: COURSE_MODEL = {
        id: this.courseId,
        name: this.courseForm.value.name ?? '',
        description: this.courseForm.value.description ?? '',
        length: Number(this.courseForm.value.length) ?? 0,
        date: formatDateToServer(this.courseForm.value.date) ?? '',
        authors: authorsMockedData ?? [],
        isTopRated: Math.random() >= 0.5,
      }
      this.courseService.updateItem(this.courseId, newCourse);
      this.resetForm();
      this.router.navigate(['/courses']);
    } else {
      const newCourse: Omit<COURSE_MODEL, 'id'> = {
        name: this.courseForm.value.name ?? '',
        description: this.courseForm.value.description ?? '',
        length: Number(this.courseForm.value.length) ?? 0,
        date: formatDateToServer(this.courseForm.value.date) ?? '',
        authors: authorsMockedData ?? [],
        isTopRated: Math.random() >= 0.5,
      }
      this.courseService.courseCreated(newCourse);
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

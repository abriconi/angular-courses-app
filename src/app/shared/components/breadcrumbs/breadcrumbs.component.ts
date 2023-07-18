import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, of, Subscription, switchAll, switchMap } from 'rxjs';
import { selectCourse } from 'src/app/store/courses/courses.selectors';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public coursesLink = '/courses';
  public courseTitle: string | null = null;
  paramsSubscription!: Subscription | undefined;
  courseSubscription!: Subscription | undefined;

  constructor(
    private router: Router,
    private store: Store
  ) { }

    ngOnInit() {
      this.paramsSubscription = this.router.events
        .pipe(filter((e: any) => {
          const event = e?.routerEvent || e;
          return event instanceof NavigationEnd;
        }),
        switchMap(() => {
          const urlParam = window.location.pathname.split('/').pop();
          const courseId = isNaN(Number(urlParam)) ? null : Number(urlParam);

          return courseId ? this.store.select(selectCourse) : of(null);
        }))
        .subscribe((course): void => {
          this.courseTitle = course? course.name : '';
        }
      )
    }
    ngOnDestroy(): void {
      if (this.paramsSubscription) {
        this.paramsSubscription.unsubscribe();
      }
      if (this.courseSubscription) {
        this.courseSubscription.unsubscribe();
      }
    }

}

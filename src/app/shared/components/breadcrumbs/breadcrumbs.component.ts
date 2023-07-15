import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { selectCourse } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public coursesLink = '/courses';
  public courseTitle: string | null = null;
  paramsSubscription!: Subscription;
  courseSubscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store
  ) { }

    ngOnInit() {
      this.paramsSubscription = this.router.events
        .pipe(filter((e: any) => {
          const event = e?.routerEvent || e;
          return event instanceof NavigationEnd;
        }))
        .subscribe(() => {

          const urlParam = window.location.pathname.split('/').pop();
          const courseId = isNaN(Number(urlParam)) ? null : Number(urlParam);

          if(courseId) {
              this.courseSubscription = this.store.select((selectCourse)).subscribe((course) => {
              this.courseTitle = course?.name || null;
            })
          } else {
            this.courseTitle = '';
          }
        }
      )
    }
    ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
      this.courseSubscription.unsubscribe();
    }

}

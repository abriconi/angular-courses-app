import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { filter, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public coursesLink = '/courses';
  public courseTitle: string | null = null;
  private courseId!: number | null;
  paramsSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
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
            this.courseService.getItemById(Number(courseId))
            this.courseService.course$.subscribe((course) => {
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
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public coursesLink = '/courses';
  public courseTitle: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) { }

  ngOnInit() {

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
      ).subscribe(() => {
        const courseId = Number(this.route.snapshot.firstChild?.paramMap.get('id'));
        if(courseId) {
          const course = this.courseService.getItemById(courseId);
          this.courseTitle = course?.name || null
        }
      }
    );

  }
}

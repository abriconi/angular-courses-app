import { Component, ContentChildren, OnInit } from '@angular/core';
import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-layout',
  templateUrl: './courses-layout.component.html',
  styleUrls: ['./courses-layout.component.scss'],
  providers: [FilterPipe, OrderByPipe],
})
export class CoursesLayoutComponent implements OnInit{
  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private courseService: CourseService,
  ) { }

  @ContentChildren(HighlightDirective) appHighlight: any;

  courses: COURSE_MODEL[] | [] = [];
  private currentPage = 1

  trackCourseById(_index: number, course: COURSE_MODEL): number {
    return course.id;
  }

  private sortCoursesByCreationDate(): void {
    this.courses = this.orderByPipe.transform(this.courses);
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.displayCourses(1, 3);
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
    this.sortCoursesByCreationDate();
  }

  loadMoreClick = (): void => {
    this.currentPage = this.currentPage + 1
    this.courseService.displayCourses(this.currentPage, 3);
  }

  deleteCourse(id: number): void {
    const deletedCourse = this.courseService.getItemById(id);

    if (deletedCourse) {
      this.courseService.removeItem(id);
    } else {
      console.log(`Course with ID ${id} not found.`);
    }
  }
  handleSearch(searchText: string) {
    // if (searchText.trim() === '') {
    //   this.courses = this.courseService.getList();
    // } else {
    //   this.courses = this.filterPipe.transform(this.courseService.getList(), searchText);
    // }
  }
}

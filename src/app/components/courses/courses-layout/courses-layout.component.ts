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
    private courseService: CourseService,
  ) { }

  @ContentChildren(HighlightDirective) appHighlight: any;

  courses: COURSE_MODEL[] | [] = [];
  private currentPage = 1
  private searchText = '';

  trackCourseById(_index: number, course: COURSE_MODEL): number {
    return course.id;
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getList(1, 3);
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  loadMoreClick = (): void => {
    this.currentPage = this.currentPage + 1
    this.courseService.getList(this.currentPage, 3, this.searchText);
  }

  deleteCourse(id: number): void {
    this.courseService.removeItem(id);
  }

  handleSearch(searchText: string) {
    this.currentPage = 1;
    this.searchText = searchText;
    this.courseService.getList(this.currentPage, 3, searchText);
  }
}

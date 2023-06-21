import { Component, ContentChildren, OnInit } from '@angular/core';
import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { Course } from 'src/app/utilus/global.moduls';

import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-layout',
  templateUrl: './courses-layout.component.html',
  styleUrls: ['./courses-layout.component.scss'],
  providers: [OrderByPipe, FilterPipe],
})
export class CoursesLayoutComponent implements OnInit{
  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private courseService: CourseService,
  ) { }

  @ContentChildren(HighlightDirective) appHighlight: any;

  courses: Course[] = [];

  trackCourseById(_index: number, course: Course): string {
    return course.id;
  }

  private sortCoursesByCreationDate(): void {
    this.courses = this.orderByPipe.transform(this.courses);
  }

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this.courses = this.courseService.getList();
    this.sortCoursesByCreationDate();
  }

  loadMoreClick():void {
    console.log('Button "Load more" cliked');
  }

  deleteCourse(id: string): void {
    const deletedCourse = this.courseService.getItemById(id);

    if (deletedCourse) {
      this.courseService.removeItem(id);
    } else {
      console.log(`Course with ID ${id} not found.`);
    }
  }
  handleSearch(searchText: string) {
    if (searchText.trim() === '') {
      this.courses = this.courseService.getList();
    } else {
      this.courses = this.filterPipe.transform(this.courseService.getList(), searchText);
    }
  }
}

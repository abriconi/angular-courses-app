import { Component, ContentChildren, OnInit } from '@angular/core';

import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { coursesMockedData } from 'src/app/utilus/global.constans';
import { Course } from 'src/app/utilus/global.moduls';

import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [OrderByPipe, FilterPipe],
})

export class CoursesComponent implements OnInit {

  constructor(private orderByPipe: OrderByPipe, private filterPipe: FilterPipe) { }

  @ContentChildren(HighlightDirective) appHighlight: any;

  courses: Course[] = [];

  trackCourseById(_index: number, course: Course): string {
    return course.id;
  }

  private sortCoursesByCreationDate(): void {
    this.courses = this.orderByPipe.transform(this.courses);
  }

  ngOnInit(): void {
    this.courses = coursesMockedData;
    this.sortCoursesByCreationDate();
    console.log('onInit');
  }

  loadMoreClick():void {
    console.log('Button "Load more" cliked');
  }
  logDeletedCourse(id: string): void {
    console.log(`Deleted course ID: ${id}`);
  }
  handleSearch(searchText: string) {
    this.courses = this.filterPipe.transform(this.courses, searchText);
  }
}

import { Component, ContentChildren, OnInit } from '@angular/core';

import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { coursesMockedData } from 'src/app/utilus/global.constans';
import { Course } from 'src/app/utilus/global.moduls';

import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [OrderByPipe, FilterPipe],
})

export class CoursesComponent implements OnInit {

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
      console.log(`Deleted course:`, deletedCourse);
    } else {
      console.log(`Course with ID ${id} not found.`);
    }
  }
  handleSearch(searchText: string) {
    if (searchText.trim() === '') {
      this.courses = coursesMockedData;
    } else {
      this.courses = this.filterPipe.transform(this.courses, searchText);
    }
  }
  showConfirmationModal = true;

  onCloseModal = () => {
    this.showConfirmationModal = false;
  }

  // confirmDelete(id: string): void {
  //   // Logic for confirming the delete action
  //   console.log(`Confirm delete course with ID: ${id}`);
  //   this.deleteCourse(id);
  // }

  // cancelDelete(): void {
  //   // Logic for canceling the delete action
  //   console.log('Delete action canceled');
  // }
}

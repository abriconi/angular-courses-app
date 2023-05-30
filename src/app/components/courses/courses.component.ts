import { Component, ContentChildren, OnInit } from '@angular/core';
import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { coursesMockedData } from 'src/app/utilus/global.constans';
import { Course } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @ContentChildren(HighlightDirective) appHighlight: any;

  courses: Course[] = [];

  trackCourseById(_index: number, course: Course): string {
    return course.id;
  }

  ngOnInit(): void {
    this.courses = coursesMockedData;
    console.log('onInit');
  }

  loadMoreClick():void {
    console.log('Button "Load more" cliked');
  }
  logDeletedCourse(id: string): void {
    console.log(`Deleted course ID: ${id}`);
  }
}

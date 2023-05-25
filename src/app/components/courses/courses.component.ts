import { Component, OnInit } from '@angular/core';
import { coursesMockedData } from 'src/app/utilus/global.constans';
import { Course } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  trackCourseById(_index: number, course: Course): string {
    return course.id;
  }

  ngOnInit(): void {
    this.courses = coursesMockedData;
    console.log('onInit');
  }

  handleClick():void {
    console.log('Button "Load more" cliked');
  }
}

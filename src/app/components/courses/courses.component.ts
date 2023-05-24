import { Component, } from '@angular/core';
import { coursesMockedData } from 'src/app/utilus/global.constans';
import { Course } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses:Course[] = coursesMockedData;

  handleClick():void {
    console.log('Button "Load more" cliked');
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/utilus/global.moduls';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[]): Course[] {
    return courses.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateA.getTime() - dateB.getTime();
    });
  }
}

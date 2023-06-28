import { Pipe, PipeTransform } from '@angular/core';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: COURSE_MODEL[]): COURSE_MODEL[] {
    return courses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }
}

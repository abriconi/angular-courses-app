import { Pipe, PipeTransform } from '@angular/core';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';


@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: COURSE_MODEL[], filterValue: string): COURSE_MODEL[] {
    if (!filterValue || filterValue.trim() === '') {
      return courses;
    }
    filterValue = filterValue.toLowerCase();
    return courses.filter((course) =>
      course.name.toLowerCase().includes(filterValue)
    );
  }
}

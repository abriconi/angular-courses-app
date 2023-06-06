import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/utilus/global.moduls';


@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: Course[], filterValue: string): Course[] {
    if (!filterValue || filterValue.trim() === '') {
      return courses;
    }
    filterValue = filterValue.toLowerCase();
    return courses.filter((course) =>
      course.title.toLowerCase().includes(filterValue)
    );
  }
}

import { Injectable } from '@angular/core';
import { Course } from './utilus/global.moduls';
import { coursesMockedData } from './utilus/global.constans';
import { generateId } from './utilus/helpers';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  static courses: Course[] = coursesMockedData;

  // constructor() {}

  getList(): Course[] {
    return CourseService.courses;
  }
  createCourse(newCourseData: Partial<Course>): Course {
    const newCourseID = generateId()

    const newCourse = {
      id: newCourseID,
      title: newCourseData.title || '',
      topRated: newCourseData.topRated || false,
      creationDate: newCourseData.creationDate || '',
      duration: newCourseData.duration || '',
      description: newCourseData.description || ''
    }
    CourseService.courses.push(newCourse);

    return newCourse;
  }
  // getItemById(id: string): Course {
  //   return
  // }
  // updateItem(id: string): Course {
  //   return
  // }
  // removeItem(id: string): void {

  // }
}

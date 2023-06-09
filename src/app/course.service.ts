import { Injectable } from '@angular/core';
import { Course } from './utilus/global.moduls';
import { coursesMockedData } from './utilus/global.constans';
import { generateId } from './utilus/helpers';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  static courses: Course[] = coursesMockedData;

  getList(): Course[] {
    return CourseService.courses;
  }
  courseCreated(newCourseData: Omit<Course, 'id' | 'topRated'>): Course {

    const newCourseID = generateId();

    const newCourse: Course = {
      id: newCourseID,
      topRated: false,
      title: newCourseData.title,
      creationDate: newCourseData.creationDate,
      duration: newCourseData.duration,
      description: newCourseData.description,
      authors: newCourseData.authors
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

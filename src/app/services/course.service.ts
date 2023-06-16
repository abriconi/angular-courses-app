import { Injectable } from '@angular/core';
import { Course } from '../utilus/global.moduls';
import { coursesMockedData } from '../utilus/global.constans';
import { generateId } from '../utilus/helpers';

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

  getItemById(id: string): Course | undefined {
    return CourseService.courses.find(course => course.id === id);
  }

  updateItem(updatedCourse: Course): void {
    const courses: Course[] = this.getList();
    const index = courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      courses[index] = updatedCourse;
    }
    //need to change fieldes to new one, but not change all course
  }

  removeItem(id: string): void {
    const index = CourseService.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      CourseService.courses.splice(index, 1);
    }
  }
}

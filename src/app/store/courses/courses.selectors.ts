import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, CoursesListState } from './courses.reducer';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

const selectCourseState = createFeatureSelector<CourseState>('course');
const selectCourseListState = createFeatureSelector<CoursesListState>('courses');

export const selectCoursesList = createSelector(
  selectCourseListState,
  (state: CoursesListState): COURSE_MODEL[] | [] => state.courses
);

export const selectCourse = createSelector(
  selectCourseState,
  (state: CourseState): COURSE_MODEL | null => state.course
);



import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, CoursesListState } from './courses.reducer';
import { COURSE_MODEL, User } from 'src/app/utilus/global.moduls';

const selectCourseState = createFeatureSelector<CourseState>('course');
const selectCourseListState = createFeatureSelector<CoursesListState>('coursesList');

export const selectCoursesList = createSelector(
  selectCourseListState,
  (state: CoursesListState): COURSE_MODEL[] | null => state.coursesList
);

export const selectCourse = createSelector(
  selectCourseState,
  (state: CourseState): COURSE_MODEL | null => state.course
);



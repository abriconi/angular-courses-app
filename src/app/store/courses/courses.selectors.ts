import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, CoursesListState, AuthorsState } from './courses.reducer';
import { Authors, COURSE_MODEL } from 'src/app/utilus/global.moduls';

const selectCourseState = createFeatureSelector<CourseState>('course');
const selectCourseListState = createFeatureSelector<CoursesListState>('courses');
const selectAuthorsState = createFeatureSelector<AuthorsState>('authors');

export const selectCoursesList = createSelector(
  selectCourseListState,
  (state: CoursesListState): COURSE_MODEL[] | [] => state.courses
);

export const selectCourse = createSelector(
  selectCourseState,
  (state: CourseState): COURSE_MODEL | null => state.course
);

export const selectAuthors = createSelector(
  selectAuthorsState,
  (state: AuthorsState): Authors[] | null => state.authors
);



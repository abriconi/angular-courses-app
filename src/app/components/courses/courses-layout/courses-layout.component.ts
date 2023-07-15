import { Component, ContentChildren, OnDestroy, OnInit } from '@angular/core';
import { HighlightDirective } from 'src/app/shared/directives/highlight/highlight.directive';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteCourse as deleteCourseAction, getCourses as getCoursesAction } from '../../../store/courses/courses.actions';
import { selectCoursesList } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses-layout',
  templateUrl: './courses-layout.component.html',
  styleUrls: ['./courses-layout.component.scss'],
})
export class CoursesLayoutComponent implements OnInit, OnDestroy  {

  coursesSubscripton!: Subscription;

  constructor(
    private store: Store,
  ) { }

  @ContentChildren(HighlightDirective) appHighlight: any;

  courses!: COURSE_MODEL[] | [];
  private currentPage = 1;
  private searchText = '';
  private pageSize = 3;

  trackCourseById(_index: number, course: COURSE_MODEL): number {
    return course.id;
  }

  ngOnInit(): void {
    this.coursesSubscripton = this.store.select((selectCoursesList)).subscribe((courses) => {
      this.courses = courses;
    });
    this.getCourses();
  }

  getCourses(): void {
    const amount = this.pageSize * this.currentPage;
    this.store.dispatch(getCoursesAction({ amount: amount, textFragment: this.searchText }));
  }

  loadMoreClick = (): void => {
    this.currentPage = this.currentPage + 1
    const amount = this.pageSize * this.currentPage
    this.store.dispatch(getCoursesAction({ amount: amount, textFragment: this.searchText }));
  }

  deleteCourse(id: number): void {
    this.store.dispatch(deleteCourseAction({ id }));
    this.getCourses();
  }

  handleSearch(searchText: string) {
    this.currentPage = 1;
    const amount = this.pageSize * this.currentPage
    this.searchText = searchText;
    this.store.dispatch(getCoursesAction({ amount: amount, textFragment: this.searchText }));
  }

  ngOnDestroy(): void {
    this.coursesSubscripton.unsubscribe();
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  // { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses/id', component: CourseInfoComponent },
  { path: 'courses/new', component: CourseInfoComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

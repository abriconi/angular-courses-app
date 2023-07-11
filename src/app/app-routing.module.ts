import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { CoursesLayoutComponent } from './components/courses/courses-layout/courses-layout.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CoursesLayoutComponent },
      { path: ':id', component: CourseInfoComponent },
      { path: 'new', component: CourseInfoComponent }
    ],
    canActivate: [AuthGuard],
    data: {
      requiresLogin: true,
    },
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: ErrorComponent,
    canActivate: [AuthGuard],
    data: {
      requiresLogin: true,
     }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

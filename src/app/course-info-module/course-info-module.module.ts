import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { CourseInfoComponent } from '../components/course-info/course-info.component';

@NgModule({
  declarations: [CourseInfoComponent],
  exports: [CourseInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CourseInfoComponent }
    ])
  ]
})
export class CourseInfoModule { }

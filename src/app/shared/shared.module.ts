import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import { CommonModule } from '@angular/common';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { SearchFormComponent } from './search-form/search-form.component';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
  ],
})
export class SharedModule { }

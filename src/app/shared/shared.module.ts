import { NgModule } from '@angular/core';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import { CommonModule } from '@angular/common';
import { CoursesItemComponent } from './courses-item/courses-item.component';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    LogoComponent,
    IconComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
  ],
})
export class SharedModule { }

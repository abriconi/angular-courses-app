import { NgModule } from '@angular/core';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    BreadcrumpsComponent,
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
  ],
})
export class SharedModule { }

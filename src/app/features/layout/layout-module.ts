import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import SharedModule to get sidebar and header
import { SharedModule } from '../../shared/shared-module';

// Layout Component
import { MainLayoutComponent } from './main-layout/main-layout';

@NgModule({ 
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MainLayoutComponent  
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutModule { }
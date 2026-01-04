import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { SidebarComponent } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header'; 

// SVG Icons
import { SVG_ICONS } from './components/svg-icons/svg-icons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    ...SVG_ICONS 
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Components
    SidebarComponent,
    HeaderComponent,

    ...SVG_ICONS
  ]
})
export class SharedModule { }
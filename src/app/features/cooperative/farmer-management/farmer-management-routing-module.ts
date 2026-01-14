import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerManagementComponent } from './farmer-management';

const routes: Routes = [
  {
    path: '',
    component: FarmerManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerManagementRoutingModule { }
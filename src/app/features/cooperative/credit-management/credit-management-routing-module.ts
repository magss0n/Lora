import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditManagementComponent } from './credit-management';

const routes: Routes = [
  {
    path: '',
    component: CreditManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditManagementRoutingModule { }
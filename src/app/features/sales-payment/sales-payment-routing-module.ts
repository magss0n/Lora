import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesPaymentComponent } from './sales-payment';

const routes: Routes = [
  {
    path: '',
    component: SalesPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesPaymentRoutingModule { }
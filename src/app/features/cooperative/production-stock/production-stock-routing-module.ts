import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionStockComponent } from './production-stock';

const routes: Routes = [
  {
    path: '',
    component: ProductionStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionStockRoutingModule { }
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { ProductionStockRoutingModule } from './production-stock-routing-module';
import { ProductionStockComponent } from './production-stock';

@NgModule({ 
  imports: [
    SharedModule,
    ProductionStockRoutingModule,
    ProductionStockComponent
  ]
})
export class ProductionStockModule { }
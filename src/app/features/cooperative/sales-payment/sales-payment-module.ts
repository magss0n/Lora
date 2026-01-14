import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { SalesPaymentRoutingModule } from './sales-payment-routing-module';
import { SalesPaymentComponent } from './sales-payment';

@NgModule({ 
  imports: [
    SharedModule,
    SalesPaymentRoutingModule,
    SalesPaymentComponent
  ]
})
export class SalesPaymentModule { }
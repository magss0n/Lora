import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { CreditManagementRoutingModule } from './credit-management-routing-module';
import { CreditManagementComponent } from './credit-management';

@NgModule({ 
  imports: [
    SharedModule,
    CreditManagementRoutingModule,
    CreditManagementComponent
  ]
})
export class CreditManagementModule { }
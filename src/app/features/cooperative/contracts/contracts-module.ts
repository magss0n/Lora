import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { ContractsRoutingModule } from './contracts-routing-module';
import { ContractsComponent } from './contracts';

@NgModule({ 
  imports: [
    SharedModule,
    ContractsRoutingModule,
    ContractsComponent
  ]
})
export class ContractsModule { }
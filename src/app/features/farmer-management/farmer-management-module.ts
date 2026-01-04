import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FarmerManagementRoutingModule } from './farmer-management-routing-module';
import { FarmerManagementComponent } from './farmer-management';

@NgModule({ 
  imports: [
    SharedModule,
    FarmerManagementRoutingModule,
    FarmerManagementComponent
  ]
})
export class FarmerManagementModule { }
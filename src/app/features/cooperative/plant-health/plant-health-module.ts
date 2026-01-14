import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { PlantHealthRoutingModule } from './plant-health-routing-module';
import { PlantHealthComponent } from './plant-health';

@NgModule({ 
  imports: [
    SharedModule,
    PlantHealthRoutingModule,
    PlantHealthComponent
  ]
})
export class PlantHealthModule { }
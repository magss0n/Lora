// features/plant-health/plant-health-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantHealthComponent } from './plant-health';

const routes: Routes = [
  {
    path: '',
    component: PlantHealthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantHealthRoutingModule { }
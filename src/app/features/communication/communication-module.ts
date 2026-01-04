import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { CommunicationRoutingModule } from './communication-routing-module';
import { CommunicationComponent } from './communication';

@NgModule({
  imports: [
    SharedModule,
    CommunicationRoutingModule,
    CommunicationComponent
  ]
})
export class CommunicationModule { }
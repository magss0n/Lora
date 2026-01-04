import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './login/login';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    LoginComponent // Import standalone component here
  ]
})
export class AuthModule { }
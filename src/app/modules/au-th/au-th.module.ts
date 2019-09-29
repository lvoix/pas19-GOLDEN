import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuThRoutingModule } from './au-th-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LandingComponent],
  imports: [
    CommonModule,
    AuThRoutingModule
  ]
})
export class AuThModule { }
